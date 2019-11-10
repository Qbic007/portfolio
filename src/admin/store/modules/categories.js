const findRequiredCategory = (category, skill, cb) => {
  if (category.id === skill.category) {
    cb(category);
  }

  return category;
};

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    ADD_CATEGORY(state, category) {
      state.categories.unshift(category);
    },
    ADD_SKILL(state, newSkill) {
      state.categories = state.categories.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }

        return category;
      });
    },
    REMOVE_SKILL(state, deletedSkill) {
      const removeSkill = category => {
        category.skills = category.skills.filter(
          skill => skill.id !== deletedSkill.id
        );
      };

      const findRequiredCategory = category => {
        if (category.id === deletedSkill.category) {
          removeSkill(category);
        }

        return category;
      };

      state.categories = state.categories.map(findRequiredCategory);
    },
    EDIT_SKILL(state, editedSkill) {
      const editSkill = category => {
        category.skills = category.skills.map(skill =>
          skill.id === editedSkill.id ? editedSkill : skill
        );
      };

      state.categories = state.categories.map(category =>
        findRequiredCategory(category, editedSkill, editSkill(category))
      );
    }
  },
  actions: {
    async addCategory({ commit }, title) {
      try {
        const { data } = await this.$axios.post("/categories", { title });
        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async fetchCategories({ commit }) {
      try {
        const { data } = await this.$axios.get("/categories/1");
        commit("SET_CATEGORIES", data);
      } catch (error) {}
    }
  }
};
