import UsersList from "./UsersList"

async function getData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    return res.json()
}

export default async function NextPage() {
    const users = await getData()
    return (
        <div className="p-10 bg-slate-900 text-white min-h-screen">
            <h1 className="text-4xl font-bold border-b pb-4">
                Next.js Dashboard
            </h1>
            <UsersList users={users} />
        </div>
    )
}

// send source code to alexandra.bratu@unitbv.ro
