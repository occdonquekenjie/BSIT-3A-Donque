import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = () => {
    if (!email.trim() || !password) { Alert.alert('Missing details', 'Enter your email and password to continue.'); return; }
    router.replace('/home');
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-[#f9fd7f]" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">
        <View className="mb-8 items-center">
          <Text className="text-3xl font-extrabold text-slate-900">Welcome to SnapTik🐣</Text>
        </View>
        <View className="rounded-[30px] bg-white p-6 shadow-sm border border-slate-100">
          <Text className="mb-2 text-sm font-bold ">Email address</Text>
          <View className="mb-5 flex-row items-center  border border-slate-800  px-4"><TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address"autoCorrect={false} className="h-14 flex-1 pl-3 text-slate-900" /></View>
          <Text className="mb-2 text-sm font-bold text-slate-700">Password</Text>
          <View className="mb-6 flex-row items-center  border border-slate-800  px-4"><TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry className="h-14 flex-1 pl-3 text-slate-900" /></View>
          <Pressable onPress={submit} className="items-center  bg-cyan-600 py-4"><Text className="text-base font-bold text-white">Login</Text></Pressable>
          <View className="mt-6 flex-row justify-center"><Text className="text-slate-500">Don't have an account? </Text><Pressable onPress={() => router.push('/register')}><Text className="font-bold text-cyan-600">Register</Text></Pressable></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
