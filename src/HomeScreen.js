import { Text, StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/client";
import { NEXT_LAUNCH } from "./gql/Query";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
  const { data, loading } = useQuery(NEXT_LAUNCH);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const launchTime = new Date(data.launchNext.launch_date_local).getTime();
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDiff = launchTime - currentTime;
      setTimeRemaining(timeDiff);
    }, 1000);
    return () => clearInterval(timer);
  }, [data]);

  if (loading) {
    return <Text>Fetching data...</Text>;
  }

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.launchNext.mission_name}</Text>
      <Text style={styles.date}>
        Launches in {hours} hours, {minutes} minutes, and {seconds} seconds
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontStyle: "italic",
  },
});
