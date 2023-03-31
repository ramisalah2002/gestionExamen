import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

export default function ExamList() {
    const [examList, setExamList] = useState([]);

    useEffect(() => {
      const fetchExams = async () => {
        const response = await fetch("http://10.0.2.2:8000/api/upcoming-exams/7");
        const exams = await response.json();
        setExamList(exams);
      };
      fetchExams();
    }, []);
    
    const firstExam = examList[0];
    console.log(firstExam);
    

  return (
    <View>
      {examList.map((exam) => (
        <View key={exam.id} style={{ padding: 16 }}>
          <Text style={{ fontSize: 18 }}>{exam.matiere_nom}</Text>
          <Text style={{ fontSize: 16 }}>Duration: {exam.duree} minutes</Text>
        </View>
      ))}
    </View>
  );
}
