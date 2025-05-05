import React, { useState } from "react";
import { SignedIn } from "@clerk/clerk-expo";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  sender: "user" | "admin";
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "admin", text: "Merhaba! Size nasıl yardımcı olabilirim?" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simülasyon: Admin otomatik cevap
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "admin",
          text: "Mesajınızı aldım. Kısa sürede döneceğim!",
        },
      ]);
    }, 1000);
  };

  return (
    <SignedIn>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.sender === "user" ? styles.userBubble : styles.adminBubble,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            contentContainerStyle={{ padding: 10 }}
          />

          <View style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Mesaj yaz..."
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={{ color: "#fff" }}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SignedIn>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messageBubble: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  adminBubble: {
    backgroundColor: "#EAEAEA",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
