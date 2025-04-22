<script lang="ts">
  import { getGeminiResponse } from "$lib/data";

  let userInput = $state("");

  async function getResponse() {
    if (userInput === "" || userInput.trim() === "") {
      return;
    }
    try {
      await getGeminiResponse(userInput);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("알 수 없는 오류 발생", err);
      }
    } finally {
      userInput = "";
    }
  }
</script>

<div class="input-wrapper">
  <textarea
    bind:value={userInput}
    placeholder="무엇이든 물어보세요"
    onkeyup={(evt) => {
      if (evt.key === "Enter") {
        getResponse();
      }
    }}
  ></textarea>
</div>

<style>
  .input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  textarea {
    width: 80%;
    padding: 12px 16px;
    font-size: 1rem;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s ease-in-out;
    resize: vertical;
    outline: none;
  }
  textarea:focus {
    border-color: #007bff;
  }
</style>
