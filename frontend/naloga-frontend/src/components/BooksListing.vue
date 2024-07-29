<script setup>
import { onMounted, ref } from 'vue'
import { useLoginStore } from '@/stores/login.store'

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Book from '@/components/Book.vue'

const books = useLoginStore()
const isLoading = ref(true)

onMounted(async() => {
    try {
        books.getBooks()
    } catch(error) {
        console.error('Error fetching jobs')
    } finally {
        isLoading.value = false;
    }
})
</script>
<template>
    <section class="text-center">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 mt-6 text-center">
                Books
            </h2>
            <div v-if="isLoading" class="text-center text-gray-500 py-6 bg-greem-500">
                <PulseLoader />
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="overflow-x-auto">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        <Book v-for="book in books.books" :key="book.id" :book="book" />
                    </table>
                </div>
            </div>
        </div>
    </section>

</template>


