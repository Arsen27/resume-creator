<template>
  <div class="statusbar">
    <div class="statusbar__labels">
      <div class="statusbar__label label_left">
        <span>
          <span class="label__num">10%</span>
          <span class="label__text">Profile completeness</span>
        </span>
      </div>

      <div class="statusbar__label label_right">
        <span>
          <span class="label__num">+5%</span>
          <span class="label__text">Add profile summary</span>
        </span>

        <div class="label__info">
          <div class="label__info-icon">?</div>
        </div>
      </div>
    </div>

    <div class="statusbar__line">
      <div class="statusbar__line-active"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

.statusbar 

  &__line 
    height: 4px
    width: 100%

    border-radius: 4px
    background: var(--color-bg-light)

    &-active
      height: 4px
      width: 70px

      border-radius: 4px
      background: var(--color-accent-red)

  &__labels
    display: flex
    justify-content: space-between 
    margin-bottom: 12px

  &__label
    display: flex

.label

  &_left
    .label__num
      font-size: 16px
      font-weight: 600

      margin-right: 3px

      color: var(--color-accent-red)
    
    .label__text
      font-size: 14px
      color: #3D3A3A

  &_right
    .label__num
      font-size: 14px
      font-weight: 600

      margin-right: 2px

      color: var(--color-accent-blue)

    .label__text
      font-size: 12px
      color: var(--color-text-light)

  &__info
    margin-left: 12px
    align-self: flex-end

    &-icon 
      width: 16px
      height: 16px
      display: flex
      justify-content: center
      align-items: center

      font-size: 9px

      color: var(--color-text-contrast)
      background: var(--color-accent-blue)
      border-radius: 50%
      

</style>
