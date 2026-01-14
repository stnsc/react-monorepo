"use client" // This tells Next.js this component is interactive

import { useState } from "react"

interface User {
    id: number
    name: string
    email: string
}

export default function UsersList({ users }: { users: User[] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [likedUsers, setLikedUsers] = useState<number[]>([])

    // Filter logic
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleLike = (id: number) => {
        setLikedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        )
    }

    return (
        <div className="mt-6">
            <input
                type="text"
                placeholder="Search team members..."
                className="w-full p-3 mb-6 rounded bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid gap-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center transition-all hover:border-blue-500"
                    >
                        <div>
                            <p className="font-bold text-lg">{user.name}</p>
                            <p className="text-slate-400 text-sm">
                                {user.email}
                            </p>
                        </div>

                        <button
                            onClick={() => toggleLike(user.id)}
                            className={`px-4 py-2 rounded-full transition-colors ${
                                likedUsers.includes(user.id)
                                    ? "bg-pink-600 text-white"
                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                        >
                            {likedUsers.includes(user.id)
                                ? "❤️ Liked"
                                : "♡ Like"}
                        </button>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <p className="text-center text-slate-500 mt-10">
                    No members found matching "{searchTerm}"
                </p>
            )}
        </div>
    )
}
