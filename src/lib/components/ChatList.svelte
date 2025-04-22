<script lang="ts">
  import "highlight.js/styles/github.css";
  import MarkdownIt from "markdown-it";
  import hljs from "highlight.js";
  import { history } from "$lib/shared.svelte";

  // markdown-it의 유틸리티 함수인 escapeHtml를 미리 분리합니다.
  const escapeHtml = (() => {
    // 임시 인스턴스를 생성하여 escapeHtml 함수를 가져옴
    const tempMd = new MarkdownIt();
    return tempMd.utils.escapeHtml;
  })();

  // md 인스턴스를 생성할 때 highlight 함수에 명시적 타입을 추가합니다.
  const md: MarkdownIt = new MarkdownIt({
    highlight: (str: string, lang: string): string => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            `<pre class="hljs"><code>` +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            `</code></pre>`
          );
        } catch (e) {
          console.error(e);
        }
      }
      return `<pre class="hljs"><code>` + escapeHtml(str) + `</code></pre>`;
    },
  });
</script>

<ul>
  {#each history as hi, idx (idx)}
    <li class={hi.role === "user" ? "user-li" : "model-li"}>
      <div
        class="text-wrapper {hi.role === 'user'
          ? 'user-text-wrapper'
          : 'model-text-wrapper'}"
      >
        {@html md.render(hi.parts[0].text)}
      </div>
    </li>
  {/each}
</ul>

<style>
  ul {
    height: 50vh;
    display: flex;
    flex-direction: column;
    padding: 30px;
    overflow-y: auto;
  }

  ul::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  li {
    width: 50%;
    padding: 10px;
  }

  .user-li {
    align-self: flex-end;
    text-align: right;
  }

  .text-wrapper {
    display: inline-block;
  }

  .user-text-wrapper {
    background-color: rgb(245, 245, 245);
    padding: 10px;
    border-radius: 10px;
  }
</style>
