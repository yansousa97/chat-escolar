'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Hash, Users } from 'lucide-react'

// Tipos
type Message = {
  id: number
  user: string
  content: string
  timestamp: string
}

type Channel = {
  id: number
  name: string
}

type User = {
  id: number
  name: string
  role: 'professor' | 'aluno'
  avatar: string
}

// Dados simulados
const initialChannels: Channel[] = [
  { id: 1, name: 'geral' },
  { id: 2, name: 'matemática' },
  { id: 3, name: 'português' },
  { id: 4, name: 'história' },
]

const initialUsers: User[] = [
  { id: 1, name: 'João Silva', role: 'professor', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Maria Santos', role: 'aluno', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'Pedro Oliveira', role: 'aluno', avatar: '/placeholder.svg?height=32&width=32' },
]

export function EscolaChat() {
  const [channels, setChannels] = useState<Channel[]>(initialChannels)
  const [currentChannel, setCurrentChannel] = useState<Channel>(channels[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [currentUser, setCurrentUser] = useState<User>(users[0])

  // Simula a obtenção de mensagens do servidor
  useEffect(() => {
    const fetchMessages = () => {
      const mockMessages: Message[] = [
        { id: 1, user: 'João Silva', content: 'Olá, turma!', timestamp: '10:00' },
        { id: 2, user: 'Maria Santos', content: 'Olá, professor!', timestamp: '10:01' },
        { id: 3, user: 'Pedro Oliveira', content: 'Bom dia a todos!', timestamp: '10:02' },
      ]
      setMessages(mockMessages)
    }

    fetchMessages()
  }, [currentChannel])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === '') return

    const newMsg: Message = {
      id: messages.length + 1,
      user: currentUser.name,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  return (
    <div className="flex h-screen bg-red-100">
      {/* Barra lateral de canais */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Escola Chat</h2>
        <nav>
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => setCurrentChannel(channel)}
              className={`flex items-center w-full p-2 rounded ${
                currentChannel.id === channel.id ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <Hash className="mr-2 h-4 w-4" />
              {channel.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Área principal de chat */}
      <div className="flex-1 flex flex-col">
        {/* Cabeçalho */}
        <header className="bg-yellow shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Hash className="mr-2 h-5 w-5" />
            <h1 className="text-xl font-semibold">{currentChannel.name}</h1>
          </div>
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{currentUser.name}</span>
          </div>
        </header>

        {/* Área de mensagens */}
        <ScrollArea className="flex-1 p-4">
          {messages.map(message => (
            <div key={message.id} className="mb-4">
              <div className="flex items-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={message.user} />
                  <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2 bg-yellow-300">{message.user}</span>
                    <span className="text-xs text-green-500">{message.timestamp}</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Formulário de nova mensagem */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
          <div className="flex">
            <Input
              type="text"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </div>

      {/* Barra lateral de usuários */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Usuários Online
        </h2>
        <ul>
          {users.map(user => (
            <li key={user.id} className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
              <span className="ml-auto text-xs text-gray-500">{user.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}