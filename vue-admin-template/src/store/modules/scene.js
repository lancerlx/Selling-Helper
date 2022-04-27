const state = {
  scene:[],
  lightForm:{},
  storageForm:{},
  pileForm:{}
}
const mutations={
  computeScene(state,selectList){
    state.scene=selectList;
  },
  updateLight(state,lightForm){
    state.lightForm=lightForm;
  },
  updateStorage(state,storageForm){
    state.storageForm=storageForm;
  },
  updatePile(state,pileForm){
    state.pileForm=pileForm;
  }
}

const actions={
  gocompute({commit},selectList){
    commit('computeScene',selectList)
  },
  addLightForm({commit},lightForm){
    commit('updateLight',lightForm)
  },
  addstorageForm({commit},storageForm){
    commit('updateStorage',storageForm)
  },
  addPileForm({commit},pileForm){
    commit('updatePile',pileForm)
  }
}

export default {
  state,
  mutations,
  actions
}