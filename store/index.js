// state
export const state = () => ({
    books: [
        {
            category: "Action",
            item: [
                {
                    id: "1",
                    category : "Action",    
                    title: "John Wick",
                    author: "Keanu Reeves",
                    description: "Baba Yaga The Boogeyman"
                }
            ]
        },
        {
            category: "SciFi",
            item: []
        },
        {
            category: "Anime",
            item: []
        }
    ]
})

//getters
export const getters = {
    allBooks: (state) => state.books
};

//actions
export const actions = {
    async addBook( {commit}, book) {
        const  response = book; 
        commit('addBook', response)
    },
    async removeBook( {commit}, data) {
        commit('removeBook', data)
    }

}

//mutations
export const mutations = {
    addBook(state, book) {
        debugger
        for (let i=0; i < state.books.length; i++) {
            if (book.category === state.books[i].category) {
              state.books[i].item.unshift(book);
            }
        }
    },
    removeBook(state, data) {
        let columnIndex = state.books.indexOf(data.column);
        let itemIndex = data.column.item.indexOf(data.item);
        state.books[columnIndex].item.splice(itemIndex, 1);
    }   
}