import Vue from 'vue';
import CostList from '@/components/CostList';

describe('CostList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CostList);
    const vm = new Constructor({
      propsData: {
        driving: 1,
        parking: 1,
      },
    }).$mount();

    expect(vm.$el.querySelector('.cost-list h1').textContent).to.equal(
      'Cost for 1 minutes of driving, 1 minutes of parking',
    );

    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('car2go');
    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('Smart');
    expect(vm.$el.querySelectorAll('.tariffs tr')[0].textContent).to.contain('0,43 €');
  });
});
