import { useState, useEffect, type ReactElement } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, AbstractBackground } from '../components/ui';
import PreJoinScreen, { JoinSettings } from '../components/PreJoinScreen';
import { joinRoom, getRoomInfo, getMe } from '../lib/signalingApi';
import './JoinRoomPage.css';

export default function JoinRoomPage(): ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const roomIdFromUrl = searchParams.get('roomId');
  const [roomId, setRoomId] = useState(roomIdFromUrl || '');
  const [userName, setUserName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');
  const [showPreJoin, setShowPreJoin] = useState(false);
  const [roomName, setRoomName] = useState('');

  // Check if authenticated and redirect to create page
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getMe(token)
        .then(() => navigate('/create'))
        .catch(() => localStorage.removeItem('authToken'));
    }
  }, [navigate]);

  // Hidden login shortcut (Ctrl+Shift+L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        navigate('/create');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleJoinRoom = async () => {
    if (!roomId.trim() || !userName.trim()) {
      setError('Please enter both Room ID and your name');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const roomInfo = await getRoomInfo(roomId.trim());
      setRoomName(roomInfo.name);
      setShowPreJoin(true);
      setIsJoining(false);
    } catch (err) {
      setError('Failed to join room. Please check the Room ID and try again.');
      console.error('Error joining room:', err);
      setIsJoining(false);
    }
  };

  const handleJoinWithSettings = async (settings: JoinSettings) => {
    setIsJoining(true);
    setError('');

    try {
      const response = await joinRoom(roomId.trim(), userName.trim());

      sessionStorage.setItem(
        'currentRoom',
        JSON.stringify({
          roomId: roomId.trim(),
          roomName: roomName || `Room ${roomId}`,
          userName: userName.trim(),
          participantId: response.participant_id,
          token: response.token,
          isHost: false,
          joinedAt: new Date().toISOString(),
          mediaSettings: settings,
        })
      );

      navigate(`/recording/${roomId.trim()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join room');
      setIsJoining(false);
      setShowPreJoin(false);
    }
  };

  const handleCancelPreJoin = () => {
    setShowPreJoin(false);
  };

  return (
    <AbstractBackground>
      {showPreJoin && (
        <PreJoinScreen
          roomName={roomName || `Room ${roomId.toUpperCase()}`}
          userName={userName}
          onJoin={handleJoinWithSettings}
          onCancel={handleCancelPreJoin}
        />
      )}
      <div className="join-room-page">
        <div className="join-content">
          <div className="join-header">
            <h1 className="join-title">OKARIN</h1>
            <p className="join-subtitle">Join a recording session</p>
          </div>

          <div className="join-form">
            <div className="form-group">
              <label htmlFor="roomId" className="form-label">
                Room ID
              </label>
              <Input
                id="roomId"
                type="text"
                placeholder="Enter room ID..."
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                disabled={isJoining}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userName" className="form-label">
                Your Name
              </label>
              <Input
                id="userName"
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isJoining}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
              />
            </div>

            {error && (
              <div className="join-error">
                <p>{error}</p>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              onClick={handleJoinRoom}
              disabled={isJoining}
              className="join-btn"
            >
              {isJoining ? 'Joining...' : 'Join Room'}
            </Button>
          </div>
        </div>
      </div>
    </AbstractBackground>
  );
}
