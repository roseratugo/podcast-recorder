import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  recordingStartedAt: string | null;
  recordingPausedAt: string | null;
  audioBlobs: Blob[];
  videoBlobs: Blob[];
}

export interface RecordingActions {
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  addAudioBlob: (blob: Blob) => void;
  addVideoBlob: (blob: Blob) => void;
  clearBlobs: () => void;
  setRecordingTime: (time: number) => void;
  incrementRecordingTime: () => void;
  resetRecording: () => void;
}

export type RecordingStore = RecordingState & RecordingActions;

const initialState: RecordingState = {
  isRecording: false,
  isPaused: false,
  recordingTime: 0,
  recordingStartedAt: null,
  recordingPausedAt: null,
  audioBlobs: [],
  videoBlobs: [],
};

export const useRecordingStore = create<RecordingStore>()(
  devtools(
    (set) => ({
      ...initialState,

      startRecording: () =>
        set(
          {
            isRecording: true,
            isPaused: false,
            recordingStartedAt: new Date().toISOString(),
            recordingTime: 0,
          },
          false,
          'startRecording'
        ),

      stopRecording: () =>
        set(
          {
            isRecording: false,
            isPaused: false,
            recordingStartedAt: null,
            recordingPausedAt: null,
          },
          false,
          'stopRecording'
        ),

      pauseRecording: () =>
        set(
          {
            isPaused: true,
            recordingPausedAt: new Date().toISOString(),
          },
          false,
          'pauseRecording'
        ),

      resumeRecording: () =>
        set(
          {
            isPaused: false,
            recordingPausedAt: null,
          },
          false,
          'resumeRecording'
        ),

      addAudioBlob: (blob) =>
        set(
          (state) => ({
            audioBlobs: [...state.audioBlobs, blob],
          }),
          false,
          'addAudioBlob'
        ),

      addVideoBlob: (blob) =>
        set(
          (state) => ({
            videoBlobs: [...state.videoBlobs, blob],
          }),
          false,
          'addVideoBlob'
        ),

      clearBlobs: () =>
        set(
          {
            audioBlobs: [],
            videoBlobs: [],
          },
          false,
          'clearBlobs'
        ),

      setRecordingTime: (time) => set({ recordingTime: time }, false, 'setRecordingTime'),

      incrementRecordingTime: () =>
        set(
          (state) => ({
            recordingTime: state.recordingTime + 1,
          }),
          false,
          'incrementRecordingTime'
        ),

      resetRecording: () => set(initialState, false, 'resetRecording'),
    }),
    { name: 'RecordingStore' }
  )
);
