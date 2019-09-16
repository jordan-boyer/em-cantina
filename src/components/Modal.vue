<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>
              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>
              <div class="modal-footer">
                <button class="modal-default-button" @click="$emit('ok')">
                    Supprimer
                </button>
                <button class="modal-default-button" @click="$emit('close')">
                    Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
    </transition>
</template> 

<script lang="ts">
export default {
    name: "modal"
};
</script>

<style lang="scss" src="../scss/modal.scss" scoped>

</style>