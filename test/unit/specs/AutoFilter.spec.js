import Vue from 'vue';
import AutoFilter from '@/components/AutoFilter';

describe('AutoFilter.vue', () => {
  const Constructor = Vue.extend(AutoFilter);
  let vm;

  const itemsFixture = [
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
  ];

  beforeEach(() => {
    vm = new Constructor({
      propsData: {
        items: itemsFixture,
      },
    }).$mount();
  });

  it('should render the collected categories', () => {
    expect(
      vm.$el.querySelectorAll('.filter--category .filter--category--name')[0].textContent.trim(),
    ).to.equal('doors');
    expect(
      vm.$el.querySelectorAll('.filter--category .filter--category--name')[1].textContent.trim(),
    ).to.equal('engine');
  });

  it('should render the collected values of the first category', () => {
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
  });

  it('should de-ducplicate the collected value to two unique ones', () => {
    expect(
      vm.$el
        .querySelectorAll('.filter--category:nth-child(2) .filter--value').length,
    ).to.equal(1);
  });

  describe('Selection', () => {
    it('should select all values by default', () => {
      expect(
        vm.$el
          .querySelectorAll('.filter--category:nth-child(1) .filter--value input:checked').length,
      ).to.equal(2);
    });

    it('should bind selection to data', (done) => {
      vm.filterCategories[0].values[0].selected = false;
      Vue.nextTick(() => {
        expect(
          vm.$el
            .querySelectorAll('.filter--category:nth-child(1) .filter--value input:checked').length,
        ).to.equal(1);
        done();
      });
    });
  });
});
