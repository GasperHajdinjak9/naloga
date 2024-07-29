<script setup>
defineProps({
    book: {}
})

</script>

<template>
    <tbody>
      <tr>
        <th>{{ book.id }}</th>
        <td>{{ book.title }}</td>
        <td>{{ book.title }}</td>
      </tr>
    </tbody>
</template>