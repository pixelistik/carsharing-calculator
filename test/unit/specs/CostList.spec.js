import Vue from 'vue';
import VueMaterial from 'vue-material';
Vue.use(VueMaterial);
import CostList from '@/components/CostList';
import tariffs from '@/tariffs-test';

describe('CostList.vue', () => {
  xit('should render correct contents', () => {
    const Constructor = Vue.extend(CostList);
    const vm = new Constructor({
      propsData: {
        driving: 1,
        parking: 1,
        kilometers: 201,
        tariffs,
        filter: () => true,
      },
    }).$mount();

    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('Eddy');
    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('0,36 €');
  });
});
