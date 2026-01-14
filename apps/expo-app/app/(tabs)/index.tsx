import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
} from "react-native"

interface User {
    id: number
    name: string
    email: string
}

export default function ExpoUserDirectory() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [likedIds, setLikedIds] = useState<number[]>([])

    // 1. Fetch Data (Equivalent to Next.js Server Fetch)
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                setLoading(false)
            })
            .catch((err) => console.error(err))
    }, [])

    // 2. Filter Logic
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )

    // 3. Like Toggle Logic
    const toggleLike = (id: number) => {
        setLikedIds((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        )
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Expo Directory</Text>

            <TextInput
                style={styles.searchBar}
                placeholder="Search team members..."
                placeholderTextColor="#888"
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <View>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => toggleLike(item.id)}
                            style={[
                                styles.likeButton,
                                likedIds.includes(item.id)
                                    ? styles.liked
                                    : styles.unliked,
                            ]}
                        >
                            <Text style={styles.buttonText}>
                                {likedIds.includes(item.id) ? "❤️" : "♡"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No users found.</Text>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f2f2f7", paddingHorizontal: 16 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginVertical: 20,
        color: "#1c1c1e",
    },
    searchBar: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#d1d1d6",
    },
    userCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 3,
    },
    userName: { fontSize: 18, fontWeight: "600", color: "#1c1c1e" },
    userEmail: { fontSize: 14, color: "#8e8e93", marginTop: 2 },
    likeButton: {
        padding: 10,
        borderRadius: 20,
        minWidth: 45,
        alignItems: "center",
    },
    liked: { backgroundColor: "#ffecf0" },
    unliked: { backgroundColor: "#f2f2f7" },
    buttonText: { fontSize: 18 },
    emptyText: { textAlign: "center", marginTop: 50, color: "#8e8e93" },
})
