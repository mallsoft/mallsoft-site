<script>
  export let degrees = 0;
</script>

<footer>
  <section>
    <p>Current temperature in Bergen {degrees}°C</p>
  </section>
</footer>

<style>
  section {
    padding: 0.5rem;
    margin: 0 auto;
    margin-top: 25vh;
    margin-bottom: auto;
    max-width: var(---readwidth);
  }

  p {
    font-family: var(---fontx);
    font-size: 60%;
  }
</style>
