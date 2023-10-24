import ItemList from './item-list.js';

export default function Page(){
    return (
    <main className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-black text-3xl font-bold mb-4">Shopping List</h1>
        <ItemList />
    </main>
    );
}