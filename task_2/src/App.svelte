<script>

  // api ключ для сервиса https://freecurrencyapi.com/
  let apiKey = 'твой api key';

  // валюты (usd, eur, rub)
  let currencies;

  // курсы валют, ключ - валюта, значение - курс
  let rates = {};

  // стартовое значение поля1
  let input1 = 0;

  // стартовое значение поля2
  let input2 = 0;

  // стартовое валюта выпадающего списка1
  let currency1 = 'USD';

  // стартовое валюта выпадающего списка2
  let currency2 = 'USD';

  // получение списка валют
  fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      currencies = Object.keys(data.data);
    });
  
  // получение курса валют
  fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      rates = data.data;
    });
  
  // вычисление второго поля
  function calculateExchange1() {
    input2 = input1 / rates[currency1] * rates[currency2];
  }

  // вычисление первого поля
  function calculateExchange2() {
    input1 = input2 / rates[currency2] * rates[currency1];
  }

</script>

<main>
  <!-- Если есть список валют, то отображаем выпадающий список -->
  {#if currencies}
  <!-- Выбор первой валюты, при изменении валюты меняется значение второй валюты -->
  <select bind:value={currency1} on:change={calculateExchange1}>
    {#each currencies as currency}
      <option value={currency}>
        {currency}
      </option>
    {/each}
  </select>
  {/if}

  <!-- При изменении значения поля ввода меняется значение второй валюты -->
  <input type="number" bind:value={input1} on:change={calculateExchange1} />

  {#if currencies}
  <!-- Выбор второй валюты, при изменении валюты меняется значение первой валюты -->
  <select bind:value={currency2} on:change={calculateExchange2}>
    {#each currencies as currency}
      <option value={currency}>
        {currency}
      </option>
    {/each}
  </select>
  {/if}

  <!-- При изменении значения поля ввода меняется значение первой валюты -->
  <input type="number" bind:value={input2} on:change={calculateExchange2} />

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
