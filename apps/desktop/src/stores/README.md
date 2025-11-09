# Zustand State Management

This directory contains the Zustand stores for managing application state.

## Stores

### RoomStore (`roomStore.ts`)

Manages room state including participants, media settings, and room information.

**State:**

- `roomId`: Current room ID
- `roomName`: Room name
- `userName`: Current user's name
- `isHost`: Whether the current user is the host
- `participants`: Array of participants in the room
- `mediaSettings`: Media configuration (video/audio enabled, device IDs)
- `localStream`: Local media stream
- `createdAt`: Room creation timestamp
- `joinedAt`: Room join timestamp

**Actions:**

- `setRoom()`: Initialize or update room information
- `leaveRoom()`: Leave the room and clean up
- `addParticipant()`: Add a new participant
- `removeParticipant()`: Remove a participant
- `updateParticipant()`: Update participant properties
- `setLocalStream()`: Set the local media stream
- `setMediaSettings()`: Update media settings
- `updateParticipantSpeaking()`: Update speaking status
- `updateParticipantMuted()`: Update muted status
- `updateParticipantVideo()`: Update video status

**Usage:**

```typescript
import { useRoomStore } from '../stores';

function MyComponent() {
  const { roomId, participants, setRoom, updateParticipantMuted } = useRoomStore();

  // Use state and actions
  return <div>{roomId}</div>;
}
```

**Persistence:**
The room state is persisted to `localStorage` under the key `room-storage`. Only essential data is persisted (not media streams).

---

### RecordingStore (`recordingStore.ts`)

Manages recording state and recording data.

**State:**

- `isRecording`: Whether recording is active
- `isPaused`: Whether recording is paused
- `recordingTime`: Recording duration in seconds
- `recordingStartedAt`: Recording start timestamp
- `recordingPausedAt`: Recording pause timestamp
- `audioBlobs`: Array of recorded audio blobs
- `videoBlobs`: Array of recorded video blobs

**Actions:**

- `startRecording()`: Start a new recording
- `stopRecording()`: Stop the current recording
- `pauseRecording()`: Pause the recording
- `resumeRecording()`: Resume a paused recording
- `addAudioBlob()`: Add an audio blob
- `addVideoBlob()`: Add a video blob
- `clearBlobs()`: Clear all recorded blobs
- `setRecordingTime()`: Set recording time
- `incrementRecordingTime()`: Increment time by 1 second
- `resetRecording()`: Reset recording state

**Usage:**

```typescript
import { useRecordingStore } from '../stores';

function RecordingControls() {
  const { isRecording, recordingTime, startRecording, stopRecording } = useRecordingStore();

  return (
    <button onClick={isRecording ? stopRecording : startRecording}>
      {isRecording ? `Stop (${recordingTime}s)` : 'Start'}
    </button>
  );
}
```

**Note:** Recording state is NOT persisted to avoid storing large blob data.

---

### SettingsStore (`settingsStore.ts`)

Manages user preferences and application settings.

**State:**

- `theme`: Theme mode ('light' | 'dark' | 'system')
- `language`: Application language
- `audioSettings`: Audio configuration (echo cancellation, noise suppression, etc.)
- `videoSettings`: Video configuration (quality, frame rate, aspect ratio)
- `notifications`: Notification preferences
- `lastUsedAudioDevice`: Last used audio device ID
- `lastUsedVideoDevice`: Last used video device ID
- `autoStartRecording`: Whether to auto-start recording
- `saveRecordingsPath`: Path to save recordings

**Actions:**

- `setTheme()`: Set theme mode
- `setLanguage()`: Set language
- `updateAudioSettings()`: Update audio configuration
- `updateVideoSettings()`: Update video configuration
- `updateNotifications()`: Update notification preferences
- `setLastUsedAudioDevice()`: Remember audio device
- `setLastUsedVideoDevice()`: Remember video device
- `setAutoStartRecording()`: Toggle auto-start
- `setSaveRecordingsPath()`: Set save path
- `resetSettings()`: Reset to defaults

**Usage:**

```typescript
import { useSettingsStore } from '../stores';

function SettingsPanel() {
  const { theme, setTheme, audioSettings, updateAudioSettings } = useSettingsStore();

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
```

**Persistence:**
Settings are persisted to `localStorage` under the key `settings-storage`.

---

## DevTools

All stores are configured with Zustand DevTools for debugging. You can inspect state changes in Redux DevTools browser extension.

Each action is labeled with its name (e.g., 'setRoom', 'startRecording') for easy debugging.

---

## Middleware

### Persist Middleware

`roomStore` and `settingsStore` use the `persist` middleware to save state to `localStorage`. This allows state to survive page refreshes and app restarts.

### DevTools Middleware

All stores use the `devtools` middleware for Redux DevTools integration during development.

---

## Best Practices

1. **Use Selectors**: Only select the state you need to avoid unnecessary re-renders

   ```typescript
   // Good - only subscribes to roomId
   const roomId = useRoomStore((state) => state.roomId);

   // Avoid - subscribes to entire store
   const store = useRoomStore();
   ```

2. **Actions in Callbacks**: Wrap actions in `useCallback` when passing to child components

   ```typescript
   const handleJoin = useCallback(() => {
     setRoom({ roomId, roomName, userName, isHost: true });
   }, [roomId, roomName, userName, setRoom]);
   ```

3. **Cleanup**: Always clean up media streams and resources when leaving a room

   ```typescript
   useEffect(() => {
     return () => {
       leaveRoom(); // Automatically stops streams
     };
   }, [leaveRoom]);
   ```

4. **TypeScript**: Use the exported types for type safety
   ```typescript
   import { useRoomStore, type Participant, type MediaSettings } from '../stores';
   ```
