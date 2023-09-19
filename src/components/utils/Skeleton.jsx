

const Skeleton = () => {
  const waveKeyframes = `
    @keyframes wave {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  return (
    <div className={`bg-gray-800 aspect-[2/3] rounded-md min-h-[200px]  flex items-center justify-center relative m-2 overflow-hidden`}>
      <style>{waveKeyframes}</style>
      <div className="w-full absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900  to-gray-700 animate-wave" style={{ animation: 'wave 2s infinite' }}></div>
    </div>
  )
}

export default Skeleton;