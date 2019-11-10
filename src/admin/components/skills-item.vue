<template lang="pug">
  tr(v-if="editMode === false")
    td {{skill.title}}
    td {{skill.percent}}
    td 
      button(type="button" @click="removeExistedSkill") удалить
      button(type="button" @click="editMode = true") изменить
  
  tr(v-else)
    td 
      input(type="text" v-model="editedSkill.title")
    td 
      input(type="text" v-model="editedSkill.percent")
    td 
      button(type="button" @click="editExistedSkill") сохранить
      button(type="button" @click="editMode = false") отменить

</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    skill: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      editedSkill: {...this.skill}
    }
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    async editExistedSkill() {
      try {
        await this.editSkill(this.editedSkill); 
        this.editMode = false;
      } catch (error) {
        
      }
    },
    async removeExistedSkill() {
      try {
        await this.removeSkill({
          id: this.skill.id,
          category: this.skill.category
        });
      } catch (error) {}
    }
  }
};
</script>
