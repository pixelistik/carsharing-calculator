import Vue from 'vue';
import CostList from '@/components/CostList';
import tariffs from '@/tariffs';

describe('CostList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CostList);
    const vm = new Constructor({
      propsData: {
        driving: 1,
        parking: 1,
        kilometers: 201,
        tariffs,
      },
    }).$mount();

    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('car2go');
    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('Smart');
    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('0,72 €');
  });
});
