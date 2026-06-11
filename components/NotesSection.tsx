'use client'

import { useState, useEffect } from 'react'
import { Save, Trash2, Clock } from 'lucide-react'

interface Note {
  id: string
  text: string
  timestamp: string
}

export default function NotesSection({ customerId }: { customerId: string }) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load notes from localStorage
    const storedNotes = localStorage.getItem(`notes_${customerId}`)
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [customerId])

  const handleSaveNote = async () => {
    if (!newNote.trim()) return

    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    const updatedNotes = [note, ...notes]
    setNotes(updatedNotes)
    localStorage.setItem(`notes_${customerId}`, JSON.stringify(updatedNotes))
    setNewNote('')
    setIsSaving(false)
  }

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem(`notes_${customerId}`, JSON.stringify(updatedNotes))
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-6">Matchmaker Notes</h3>

      {/* New Note Input */}
      <div className="mb-8">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note about this client..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 resize-none"
          style={{ focusRingColor: '#C0392B' }}
        />
        <button
          onClick={handleSaveNote}
          disabled={isSaving || !newNote.trim()}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors"
          style={{
            backgroundColor: isSaving || !newNote.trim() ? '#d0d0d0' : '#C0392B',
            cursor: isSaving || !newNote.trim() ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (!isSaving && newNote.trim()) {
              e.currentTarget.style.backgroundColor = '#a0311e'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSaving && newNote.trim()) {
              e.currentTarget.style.backgroundColor = '#C0392B'
            }
          }}
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save Note'}
        </button>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No notes yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 mb-2">{note.text}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={14} />
                    {note.timestamp}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
