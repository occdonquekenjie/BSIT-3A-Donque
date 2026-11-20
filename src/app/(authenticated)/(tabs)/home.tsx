import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { X } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, Modal, Pressable, ScrollView, StatusBar,
  Text, TextInput, View
} from 'react-native';

type Product = { id: string; name: string; description: string; image: string };
const API = 'https://6af3f9fe55a1de7dcf03745a.mockapi.io/api/products/items';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Product[]>(API);
      setProducts([...data].sort((a, b) => Number(b.id) - Number(a.id)));
    } catch {
      Alert.alert('Unable to load posts', 'Please check your connection and try again.');
    } finally { setLoading(false); }
  };

  useFocusEffect(useCallback(() => { getProducts(); }, []));

  const openEdit = (item: Product) => {
    setEditing(item); setTitle(item.name); setDescription(item.description); setImageUrl(item.image);
  };

  const saveEdit = async () => {
    if (!editing || !title.trim() || !description.trim() || !imageUrl.trim()) {
      Alert.alert('Missing information', 'Please complete the image URL, title, and description.'); return;
    }
    setSaving(true);
    try {
      const updated = { name: title.trim(), description: description.trim(), image: imageUrl.trim() };
      await axios.put(`${API}/${editing.id}`, updated);
      setProducts(current => current.map(item => item.id === editing.id ? { ...item, ...updated } : item));
      setEditing(null);
    } catch { Alert.alert('Could not save changes', 'Please try again.'); }
    finally { setSaving(false); }
  };

  const deletePost = (item: Product) => Alert.alert('Delete this post?', `“${item.name}” will be permanently deleted.`, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: async () => {
      try { await axios.delete(`${API}/${item.id}`); setProducts(current => current.filter(post => post.id !== item.id)); }
      catch { Alert.alert('Could not delete post', 'Please try again.'); }
    } },
  ]);

  return (
    <View className="flex-1 bg-[#5b5b5a]">
      <StatusBar barStyle="dark-content" />
      <View className="bg-black px-5 mt-6 pt-5 pb-4 border-b border-slate-800">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[29px] font-extrabold text-white">SnapTik🐣</Text>
          </View>
          <Pressable onPress={() => router.push('/posts/create')} className="flex-row items-center gap-2 bg-yellow-600 px-4 py-3">
            <Text className="font-bold text-white">New Post</Text>
          </Pressable>
        </View>
        <Text className="mt-2 text-sm ">whats on your mind?</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }} showsVerticalScrollIndicator={false}>
        {loading ? <View className="py-16"><ActivityIndicator size="large" color="#4F46E5" /></View> : products.length === 0 ? (
          <View className="rounded-3xl bg-white p-8 items-center"><Text className="text-lg font-bold ">No posts yet</Text><Text className="mt-2 text-center">Create your first post and share it with the community.</Text></View>
        ) : products.map(item => (
          <View key={item.id} className="overflow-hidden rounded-3xl bg-white border border-slate-100">
            <Pressable onPress={() => router.push({ pathname: '/posts/[id]', params: { id: item.id } })}>
              <View className="flex-row items-center px-4 py-3">
              <Image source={require("@/assets/images/littleboy.jpeg")} className="h-10 w-10 rounded-full" />
                <View className="ml-3 flex-1"><Text className="font-bold text-slate-900">Kenjie D. Donque</Text><Text className="text-xs text-slate-600">@littleboy</Text></View>
              </View>
              {!!item.image && <Image source={{ uri: item.image }} contentFit="cover" style={{ width: '100%', height: 220, backgroundColor: '#E2E8F0' }} />}
              <View className="px-4 pt-4 pb-2">
                <Text className="text-lg font-extrabold text-slate-900">{item.name}</Text>
                <Text className="mt-1 text-[14px] leading-6 text-slate-600">{item.description}</Text>
              </View>
            </Pressable>
            <View className="flex-row justify-end gap-2 px-4 pb-4 pt-2">
              <Pressable onPress={() => openEdit(item)} className="flex-row items-center gap-1.5  bg-cyan-200 px-9 py-2.5"><Text className="text-sm font-bold text-black-700">Edit</Text></Pressable>
              <Pressable onPress={() => deletePost(item)} className="flex-row items-center gap-1.5  bg-red-200 px-9 py-2.5"><Text className="text-sm font-bold text-black-600">Delete</Text></Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={!!editing} animationType="slide" transparent onRequestClose={() => setEditing(null)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-[30px] bg-white px-5 pt-5 pb-9">
            <View className="mb-5 flex-row items-center justify-between"><Text className="text-2xl font-extrabold text-slate-900">Edit post</Text><Pressable onPress={() => setEditing(null)} className="rounded-full bg-slate-100 p-2"><X size={20} color="#475569" /></Pressable></View>
            <Text className="mb-2 text-sm font-bold text-slate-700">Image URL</Text>
            <TextInput value={imageUrl} onChangeText={setImageUrl} autoCapitalize="none" placeholder="https://your-image-url.jpg" className="mb-4  border px-4  text-slate-900" />
            <Text className="mb-2 text-sm font-bold text-slate-700">Title</Text>
            <TextInput value={title} onChangeText={setTitle} placeholder="Post title" className="mb-4  border  px-4  text-slate-900" />
            <Text className="mb-2 text-sm font-bold text-slate-700">Description</Text>
            <TextInput value={description} onChangeText={setDescription} multiline textAlignVertical="top" placeholder="Write a description..." className="mb-5 min-h-[105px]  border  px-4  text-slate-900" />
            <Pressable disabled={saving} onPress={saveEdit} className="flex-row items-center justify-center gap-2  bg-cyan-600 py-4"><Text className="font-bold text-white">{saving ? 'Saving...' : 'Save changes'}</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
