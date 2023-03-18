const CountdownTimer = ({ time }) => {
    const [remainingTime, setRemainingTime] = useState(time);
  
    useEffect(() => {
      const timer = remainingTime > 0 && setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, [remainingTime]);
  
    const getDisplayTime = () => {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime - (hours * 3600)) / 60);
      const seconds = remainingTime - (hours * 3600) - (minutes * 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <View>
        <Text>{getDisplayTime()}</Text>
      </View>
    );
  };