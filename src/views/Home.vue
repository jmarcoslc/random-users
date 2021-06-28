<template>
  <div class="home">
    <ly-default>
      <div slot="header">
        <div class="md-layout md-alignment-center-center">
          <md-button @click="getRandomUsers" class="md-raised md-primary">Obtener usuarios</md-button>
        </div>
      </div>
      <div class="card-wrapper md-layout md-gutter" slot="body">
        <comp-card v-for="(user) in filteredUsers" :key="user.id.value" class="user-card md-layout-item md-size-25" 
          :name="getUserName(user.name.first, user.name.last, user.name.title)"
          :gender="genders[user.gender]"
          :nationality="getCountryNameByIso2(user.nat)"
          :bornDate="getFormatedDate(user.dob.date)"
          :registerDate="getFormatedDate(user.registered.date)"
          :userId="user.login.uuid"
        />
      </div>
      <div slot="footer">
        <div class="filters-title">Filtros</div>
        <div class="md-layout md-alignment-center-left">
          <div v-for="(value, key) in filters" :key="`filter-${key}`" class="md-layout-item">
            <comp-filter @input="(value) => setFilter(key, value)" :options="filtersOptions[key]" :filterLabel="value" />
          </div>
        </div>
      </div>
    </ly-default>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      consultedUsers: [],
      selectedFilters: { gender: undefined, age: undefined, nationality: undefined },
      filtersOptions: { gender: [{ label: 'Cualquiera', value: '' }, { label: 'Masculino', value: 'male' }, { label: 'Femenino', value: 'female' }], age: [{ label: 'Cualquiera', value: '' }], nationality: [{ label: 'Cualquiera', value: '' }]},
      filters: { gender: "Género", age: "Edad", nationality: "Nacionalidad" },
      genders: { male: 'Masculino', female: 'Femenino' },
    };
  },
  computed: {
    filteredUsers() {
      return this.consultedUsers.filter((user) => {
        let genderFilterResult = this.selectedFilters.gender ? user.gender === this.selectedFilters.gender : true;
        let ageFilterResult = this.selectedFilters.age ? user.dob.age === this.selectedFilters.age : true;
        let nationalityFilterResult = this.selectedFilters.nationality ? user.nat === this.selectedFilters.nationality : true;

        return genderFilterResult && ageFilterResult && nationalityFilterResult;
      });
    },
  },
  methods: {
    getMinAge() {
      return Math.min(...this.consultedUsers.map((user) => Number(user.dob.age)));
    },
    getMaxAge() {
      return Math.max(...this.consultedUsers.map((user) => Number(user.dob.age)));
    },
    setFiltersOptions() {
      //Ages
      let ageOptions = this.filtersOptions.age;
      let minAge = this.getMinAge();
      let maxAge = this.getMaxAge();
      let agesFilterconfig = Array.from({length: maxAge - minAge + 1},(v,k) => k + minAge).map((age) => {
        return { label: age, value: age };
      })
      ageOptions.push(...agesFilterconfig);
      this.$set(this.filtersOptions, 'age', ageOptions);

      //Nationalities
      this.consultedUsers.forEach((user) => {
        let nationalityOptions = this.filtersOptions.nationality;
        let nationality = { label: this.getCountryNameByIso2(user.nat), value: user.nat };
        let optionIncluded = nationalityOptions.find((natOption) => natOption.value === nationality.value);
        if (!optionIncluded) {
          nationalityOptions.push(nationality);
          this.$set(this.filtersOptions, 'nationality', nationalityOptions);
        }
      });
    },
    setFilter(filter, value) {
      this.$set(this.selectedFilters, `${filter}`, value);
    },
    getUserName(firstName, lastName, title) {
      return `${title}. ${firstName} ${lastName}`;
    },
    getFormatedDate(stringDate) {
      let date = new Date(stringDate);
      return date.toLocaleDateString();
    },
    getCountryNameByIso2(iso2) {
      let name = new Intl.DisplayNames([navigator.languages[0]], { type: "region" });
      return name.of(iso2.toUpperCase());
    },
    getRandomUsers() {
      this.$http.get("https://randomuser.me/api/?results=100").then(
        (response) => {
          this.consultedUsers = response.body.results;
          this.setFiltersOptions();
        },
        (response) => {}
      );
    },
  },
};
</script>
