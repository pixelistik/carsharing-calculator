import Vue from 'vue';
import CostList from '@/components/CostList';

describe('CostList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CostList);
    const vm = new Constructor({
      propsData: {
        driving: 10,
        parking: 5,
      },
    }).$mount();
    expect(vm.$el.querySelector('.cost-list h1').textContent).to.equal(
      'Cost for 10 minutes of driving, 5 minutes of parking',
    );
  });
});
