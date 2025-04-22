<script lang="ts">
  import { history } from "$lib/shared.svelte";
  import ChatInput from "$lib/components/ChatInput.svelte";
  import ChatList from "$lib/components/ChatList.svelte";
</script>

{#if history.length > 0}
  <ChatList />
{:else}
  <h1 class="title">무엇을 도와드릴까요?</h1>
{/if}

<ChatInput />

<style>
  .title {
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
