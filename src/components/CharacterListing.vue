<template>
  <section class="character-listing">
    <section class="sidebar">
      <h2 class="sidebar__title">Filter</h2>
      <div class="filter filter-status" v-for="(filter, index) in filterList" :key="filter.name">
        <!--        {{filter}}-->
        <div v-if="filter.type === 'input'">
          <input type="text" class="filter filter-search" :value="filter.query" @input="updateFilterQuery(index, $event.target.value)" :placeholder="filter.name">
        </div>
        <div v-else-if="filter.type === 'buttonList'">
          <button class="filter filter-button" :class="{'filter-button--is-active' : value.value === filter.query }" v-for="value in filter.values" :key="'filter-'+filter.name+'-'+value.label" @click="updateFilterQuery(index, value.value)">{{ value.label }}</button>
        </div>
      </div>
    </section>
    <main class="character-list-wrapper">
      <h1 class="character-list__title">Liste des personnages</h1>
      <ul class="character-list">
        <li class="character-list__item" v-for="character in characterList" :key="character.id">
          <CharacterCard :character="character"/>
        </li>
      </ul>
      <nav aria-label="listing-navigation">
        <ul class="listing-navigation__list-item">
          <li class="listing-navigation__item">
            <button type="button" class="page-link" v-if="currentPage !== 1" @click="changePage(currentPage-1)"> Previous</button>
          </li>
          <li class="listing-navigation__item">
            <button type="button" class="page-link"
                    :class="{'page-link--active' : (pageNumber === currentPage)}"
                    v-for="pageNumber in pages.slice(Math.max(0,currentPage-6), currentPage+5)"
                    :key="'page'+pageNumber"
                    @click="changePage(pageNumber)"> {{ pageNumber }}
            </button>
          </li>
          <li class="listing-navigation__item">
            <button type="button" class="page-link" v-if="currentPage < pages.length" @click="changePage(currentPage+1)"> Next</button>
          </li>
        </ul>
      </nav>
    </main>
  </section>
</template>

<script>
import filters from '../stores/filters';
import apiStore from '../stores/api';
import CharacterCard from './CharacterCard';

export default {
  components: {
    CharacterCard
  },
  name: "CharacterListing",
  data() {
    return {
      characterList: [],
      pages: [],
      searchQuery: null,
      filterList: []
    };
  },
  computed: {
    currentPage() {
      if (filters.getters.pageNumber) {
        return Number(filters.getters.pageNumber);
      }
      return 1;
    }
  },
  created() {
    this.initFilterForm();
    filters.dispatch('updateFromRouterQuery');
    this.updatePageData();
  },
  methods: {
    initFilterForm() {
      this.filterList = filters.getters.filters;
      for (const filterIndex in this.filterList) {
        this.filterList[filterIndex].query = null
        if (this.$route.query.name && this.filterList[filterIndex].label && this.filterList[filterIndex].label === "search") {
          this.filterList[filterIndex].query = this.$route.query.name;
        } else if (this.$route.query[this.filterList[filterIndex].label.toLowerCase()]) {
          this.filterList[filterIndex].query = this.$route.query[this.filterList[filterIndex].label.toLowerCase()];
        }
      }
    },
    changePage(pageNumber) {
      filters.dispatch('updatePageNumber', pageNumber)
      this.updatePageData();
    },
    changeSearchQuery(searchQuery) {
      this.searchQuery = searchQuery;
      this.updatePageData();
    },
    changeStatus(status) {
      filters.dispatch('updateStatus', status)
      this.updatePageData();
    },
    changeGender(gender) {
      console.log(gender);
      filters.dispatch('updateGender', gender)
      this.updatePageData();
    },
    changeSpecies(species) {
      filters.dispatch('updateSpecies', species)
      this.updatePageData();
    },
    updateFilterQuery(filterIndex, newQuery) {
      this.filterList[filterIndex].query = newQuery;

      if (this.filterList[filterIndex].label && this.filterList[filterIndex].label === "search") {
        filters.dispatch('updateSearch', this.filterList[filterIndex].query)
        this.changeSearchQuery(this.filterList[filterIndex].query);
      }

      if (this.filterList[filterIndex].type && this.filterList[filterIndex].type === "buttonList") {
        this[`change${this.filterList[filterIndex].label}`](this.filterList[filterIndex].query);
      }
    },
    async updatePageData() {
      const response = await fetch(apiStore.getters.apiUrlFromFilters)
      const data = await response.json();

      this.clearCharacterList();
      this.updateCharacterList(data.results);

      this.scrollBackToTop();

      this.updateNumberOfPages(data.info.pages);
    },
    clearCharacterList() {
      this.characterList = [];
    },
    updateCharacterList(characterList) {
      this.characterList.push(...characterList);
    },
    updateNumberOfPages(lastPageIndex) {
      this.pages = [];
      for (let index = 1; index <= lastPageIndex; index++) {
        this.pages.push(index);
      }
    },
    scrollBackToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  watch: {
    searchQuery: function (searchQuery) {
      filters.dispatch('updateSearch', searchQuery)
      this.changeSearchQuery(searchQuery);
    },
  }
}
</script>

<style scoped>
.character-listing {
  display : flex;
}

.character-listing .sidebar {
  flex : 0 0 25%;
}

.character-listing .character-list-wrapper {
  flex    : 1 0 0;
  padding : 0 1.5rem;
}

.sidebar {
  border-right   : 1px solid var(--color-secondary);
  display        : flex;
  flex-direction : column;
  align-items    : center;
}

.sidebar__title {
  text-align     : center;
  font-size      : calc(25px + (40 - 25) * ((100vw - 320px) / (1920 - 320)));
  font-family    : 'Get Schwifty', arial, sans-serif;
  letter-spacing : 0.025em;
  color          : var(--color-quaternary);
  text-shadow    : 0 0 10px var(--color-primary);
  margin         : 0 0 1.5rem;
}

.filter + .filter {
  margin-top : .5rem;
}

.filter-search {
  width               : 90%;
  margin              : 0 auto;
  background-color    : transparent;
  border              : 1px solid var(--color-secondary);
  border-radius       : 4px;
  font-size           : 15px;
  font-weight         : 500;
  padding             : .75rem 20px .75rem 40px;
  box-shadow          : 0 0 0 2px rgb(134 140 160 / 2%);
  background-image    : url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
  background-size     : 14px;
  background-repeat   : no-repeat;
  background-position : 16px 48%;
  color               : var(--color-secondary)
}

.filter-button {
  cursor     : pointer;
  background : transparent;
  border     : 1px solid var(--color-secondary);
  padding    : 0.5em;
  transition : all .3s;
}

.filter-button + .filter-button {
  margin-left : .5em;
}

.filter-button:hover {
  background : var(--color-secondary);
  color      : white;
}

.filter-button--is-active {
  background : var(--color-secondary);
  color      : white;
}

.character-list-wrapper {
  display        : flex;
  flex-direction : column;
  align-items    : center;
}

.character-list-wrapper .character-list__title {

  margin : 0 0 1.5rem;
}

.character-list-wrapper .character-list__pagination-btn {
  margin  : 1.5rem;
  padding : 1em 3.5em;
}

.character-list-wrapper .character-list {
  width : 100%;
}

.character-list__title {
  font-size      : calc(25px + (40 - 25) * ((100vw - 320px) / (1920 - 320)));
  font-family    : 'Get Schwifty', arial, sans-serif;
  letter-spacing : 0.025em;
  color          : var(--color-quaternary);
  text-shadow    : 0 0 10px var(--color-primary);
}

.character-list {
  display               : grid;
  grid-gap              : 1.5rem 1rem;
  grid-template-columns : repeat(auto-fill, minmax(250px, 1fr));
}

.character-list__item {
  list-style : none;
}

.character-list__item > .character-card {
  height : 100%;
}

.listing-navigation__list-item {
  margin        : 1rem 0;
  display       : -ms-flexbox;
  display       : flex;
  padding-left  : 0;
  list-style    : none;
  border-radius : 0.25rem;
}

.page-link {
  display     : inline-block;
  font-size   : 20px;
  color       : #29b3ed;
  font-weight : 500;
  border      : none;
  background  : transparent;
  padding     : .5em;
}

.page-link--active {
  background : var(--color-quaternary);
  color      : white;
}

.page-link:not(:disabled):not(.disabled) {
  cursor : pointer;
}

.page-link + .page-link {
  margin-left : 1rem;
}
</style>
