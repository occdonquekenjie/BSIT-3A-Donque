import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const submit = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) { Alert.alert('Missing details', 'Please complete all fields.'); return; }
    if (password !== confirmPassword) { Alert.alert('Passwords do not match', 'Check your password confirmation and try again.'); return; }
    Alert.alert('Account details ready', 'Connect an authentication service to create and securely store accounts.', [{ text: 'Go to Login', onPress: () => router.replace('/login') }]);
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-[#F5F7FB]" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">
        <View className="mb-7 items-center">
          <Text className="text-3xl font-extrabold text-slate-900">Create account</Text>
        </View>
        <View className="rounded-[30px] border border-slate-100 bg-white p-6 shadow-sm">
          <Text className="mb-2 text-sm font-bold text-slate-700">Full name</Text>
          <View className="mb-4 flex-row items-center border border-slate-800 px-4"><TextInput value={name} onChangeText={setName} placeholder="Your name" className="h-13 flex-1 pl-3 py-4 text-slate-900" /></View>
          <Text className="mb-2 text-sm font-bold text-slate-700">Email address</Text>
          <View className="mb-4 flex-row items-center border border-slate-800 px-4"><TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" className="h-13 flex-1 pl-3 py-4 text-slate-900" /></View>
          <Text className="mb-2 text-sm font-bold text-slate-700">Password</Text>
          <View className="mb-4 flex-row items-center border border-slate-800 px-4"><TextInput value={password} onChangeText={setPassword} placeholder="Create password" secureTextEntry className="h-13 flex-1 pl-3 py-4 text-slate-900" /></View>
          <Text className="mb-2 text-sm font-bold text-slate-700">Confirm password</Text>
          <View className="mb-6 flex-row items-center border border-slate-800 px-4"><TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Repeat password" secureTextEntry className="h-13 flex-1 pl-3 py-4 text-slate-900" /></View>
          <Pressable onPress={submit} className="items-center rounded-2xl bg-cyan-600 py-4"><Text className="text-base font-bold text-white">Register</Text></Pressable>
          <View className="mt-6 flex-row justify-center"><Text className="text-slate-500">Already have an account? </Text><Pressable onPress={() => router.replace('/login')}><Text className="font-bold text-cyan-600">Login</Text></Pressable></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
