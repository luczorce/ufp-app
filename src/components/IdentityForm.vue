<template>
  <form>
    <section>
      <h2>Names</h2>
      
      <label>
        <p>first name</p>
        <input type="text" name="firstName" value="Bana" disabled class="disabled-but-bright">
      </label>

      <label>
        <p>last name</p>
        <input type="text" name="lastName" value="Bofana" disabled class="disabled-but-bright">
      </label>
    </section>

    <section>
      <h2>Location</h2>

      <label>
        <p>City</p>
        <input type="text" name="city">
      </label>

      <label>
        <p>State/Provence</p>
        <input type="text" name="state">
      </label>

      <label>
        <p>Country</p>
        <input type="text" name="country">
      </label>
    </section>

    <section>
      <h2>Interests</h2>

      <label>
        <p>Hobbies</p>
        <textarea name="hobbies"></textarea>
      </label>

      <label>
        <p>Causes</p>
        <textarea name="causes"></textarea>
      </label>
    </section>
  </form>
</template>

<script>
export default {
  name: 'IdentityForm'
}
</script>

<style>
</style>
