export default {
  namespaced: true,
  actions: {
    async addSkill({ commit }, skill) {
      try {
        const { data } = await this.$axios.post("/skills", skill);
        commit("categories/ADD_SKILL", data, { root: true });
      } catch (error) {}
    },
    async removeSkill({ commit }, skill) {
      try {
        const { data } = await this.$axios.delete(`/skills/${skill.id}`);
        commit("categories/REMOVE_SKILL", skill, { root: true });
      } catch (error) {}
    },
    async editSkill({ commit }, editedSkill) {
      try {
        const { data } = await this.$axios.post(
          `/skills/${editedSkill.id}`,
          editedSkill
        );

        commit("categories/EDIT_SKILL", data.skill, { root: true });
      } catch (error) {}
    },
    
    async addReview(store, review) {
      const formData = new FormData();

      Object.keys(review).forEach(key => {
        formData.append(key, review[key]);
      })

      await this.$axios.post('/reviews', formData); 
      
    }
  }
};
