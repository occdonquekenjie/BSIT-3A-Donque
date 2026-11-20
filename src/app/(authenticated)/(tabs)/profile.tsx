import { Image } from 'expo-image';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const initialProfile = {
  name: 'Kenjie Donque',
  username: '@littelboy.',
  email: 'my life my rules, you love me or hate me but dont blame with me.',
  image: '',
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const openEditor = () => { setDraft(profile); setEditing(true); };
  const saveProfile = () => {
    if (!draft.name.trim() || !draft.username.trim() || !draft.email.trim()) {
      Alert.alert('Missing information', 'Name, username, and your description are required.'); return;
    }
    setProfile({ ...draft, username: draft.username.startsWith('@') ? draft.username : `@${draft.username}` });
    setEditing(false);
  };

  return (
    <View className="flex-1 bg-[#515357]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 22, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
        <View className="items-center bg-white px-6 py-10  border-slate-100">
          <View className="mb-6 rounded-full border-[5px] border-white p-1">
            <Image source={profile.image ? { uri: profile.image } : require('@/assets/images/littleboy.jpeg')} contentFit="cover" style={{ width: 190, height: 190, borderRadius: 100, backgroundColor: '#E2E8F0' }} />
          </View>
          <Text className="text-center text-[25px] font-extrabold text-slate-900">{profile.name}</Text>
          <Text className="mt-2 text-base font-semibold text-blue-500">{profile.username}</Text>
          <View className="mt-3 flex-row items-center gap-2"><Text className="text-sm text-slate-500">{profile.email}</Text></View>
          <View className="my-7 h-px w-full bg-slate-100" />
          <Pressable onPress={openEditor} className="w-full flex-row items-center justify-center gap-2 bg-yellow-600 py-4"><Text className="font-bold text-white">EDIT PROFILE</Text></Pressable>
        </View>
      </ScrollView>

      <Modal visible={editing} animationType="slide" transparent onRequestClose={() => setEditing(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[30px] bg-white px-5 pt-5 pb-9">
            <View className="mb-5 flex-row items-center justify-between"><Text className="text-2xl font-extrabold text-slate-900">Edit profile</Text><Pressable onPress={() => setEditing(false)} className="rounded-full bg-slate-100 p-2"><X size={20} color="#475569" /></Pressable></View>
            <View className="mb-4 flex-row items-center gap-3"><Image source={draft.image ? { uri: draft.image } : require('@/assets/images/littleboy.jpeg')} contentFit="cover" style={{ width: 58, height: 58, borderRadius: 30 }} /><View className="flex-1"><Text className="mb-1 text-sm font-bold text-slate-700">Profile picture URL</Text><TextInput value={draft.image} onChangeText={image => setDraft({ ...draft, image })} placeholder="Leave blank to use your current photo" className="border px-3 text-slate-900" /></View></View>
            <Text className="mb-2 text-sm font-bold">Name</Text>
            <TextInput value={draft.name} onChangeText={name => setDraft({ ...draft, name })} className="mb-4  border px-4 text-slate-900" />
            <Text className="mb-2 text-sm font-bold">Username</Text>
            <TextInput value={draft.username} onChangeText={username => setDraft({ ...draft, username })} className="mb-4  border px-4 text-slate-900" />
            <Text className="mb-2 text-sm font-bold">Your Description</Text>
            <TextInput value={draft.email} onChangeText={email => setDraft({ ...draft, email })} keyboardType="email-address" className="mb-5  border px-4 mb-40  text-slate-900" />
            <Pressable onPress={saveProfile} className="flex-row items-center justify-center gap-2 bg-cyan-600 py-4"><Text className="font-bold text-white">SAVE PROFILE</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
