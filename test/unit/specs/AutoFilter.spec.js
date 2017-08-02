import Vue from 'vue';
import AutoFilter from '@/components/AutoFilter';

describe('AutoFilter.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(AutoFilter);
    const vm = new Constructor({
      propsData: {
        items: [
          {
            id: 1,
            filterProperties: {
              doors: 2,
              engine: 'diesel',
            },
          },
          {
            id: 2,
            filterProperties: {
              doors: 3,
              engine: 'diesel',
            },
          },
        ],
      },
    }).$mount();

    expect(
      vm.$el.querySelectorAll('.filter--category .filter--category--name')[0].textContent.trim(),
    ).to.equal('doors');
    expect(
      vm.$el.querySelectorAll('.filter--category .filter--category--name')[1].textContent.trim(),
    ).to.equal('engine');

    expect(
      vm.$el
        .querySelectorAll('.filter--category:nth-child(1) .filter--value')[0]
        .textContent.trim(),
    ).to.equal('2');

    expect(
      vm.$el
        .querySelectorAll('.filter--category:nth-child(1) .filter--value')[1]
        .textContent.trim(),
    ).to.equal('3');

    expect(
      vm.$el
        .querySelectorAll('.filter--category:nth-child(2) .filter--value').length,
    ).to.equal(1);
  });
});
