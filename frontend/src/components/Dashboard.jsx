import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const temperatureData1 = [
    { time: '20:25', value: 29 },
    { time: '20:26', value: 29 },
    { time: '20:27', value: 28.3 },
    { time: '20:28', value: 27.6 },
    { time: '20:29', value: 28.2 },
    { time: '20:30', value: 28.4 },
    { time: '20:31', value: 28.7 },
  ];

  const humidityData1 = [
    { time: '20:25', value: 30 },
    { time: '20:26', value: 5 },
    { time: '20:27', value: 20 },
    { time: '20:28', value: 7 },
    { time: '20:29', value: 24 },
    { time: '20:30', value: 30 },
    { time: '20:31', value: 26 },
  ];

  const soilMoistureData1 = [
    { time: '20:25', value: 800 },
    { time: '20:26', value: 0 },
    { time: '20:27', value: 500 },
    { time: '20:28', value: 1500 },
    { time: '20:29', value: 2200 },
    { time: '20:30', value: 2000 },
    { time: '20:31', value: 1600 },
  ];

  const waterLevelData1 = [
    { time: '20:25', value: 100 },
    { time: '20:26', value: 2000 },
    { time: '20:27', value: 3000 },
    { time: '20:28', value: 3200 },
    { time: '20:29', value: 3300 },
    { time: '20:30', value: 3100 },
    { time: '20:31', value: 2700 },
  ];

  const temperatureData2 = [
    { time: '20:47', value: 28.9 },
    { time: '20:48', value: 28.8 },
    { time: '20:49', value: 28.5 },
    { time: '20:50', value: 28.6 },
    { time: '20:51', value: 28.7 },
    { time: '20:52', value: 28.2 },
    { time: '20:53', value: 28.8 },
  ];

  const humidityData2 = [
    { time: '20:47', value: 31 },
    { time: '20:48', value: 30.5 },
    { time: '20:49', value: 27.6 },
    { time: '20:50', value: 30 },
    { time: '20:51', value: 32 },
    { time: '20:52', value: 29.5 },
    { time: '20:53', value: 30 },
  ];

  const soilMoistureData2 = [
    { time: '20:47', value: 800 },
    { time: '20:48', value: 300},
    { time: '20:49', value: 1000 },
    { time: '20:50', value: 1200 },
    { time: '20:51', value: 1400 },
    { time: '20:52', value: 1600 },
    { time: '20:53', value: 1700 },
  ];

  const waterLevelData2 = [
    { time: '20:47', value: 2000 },
    { time: '20:48', value: 3000 },
    { time: '20:49', value: 3300 },
    { time: '20:50', value: 3900 },
    { time: '20:51', value: 800 },
    { time: '20:52', value: 3800 },
    { time: '20:53', value: 3600 },
  ];
  
  
  return (
    <div className={styles.bg}>
    <Card className={styles.dashboardCard}>
      <CardHeader>
        <CardTitle className={styles.rao}>IoT Agriculture Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
      <br />
      <h3 className={styles.tick}>Live Sensor Data 1</h3>
        <div className={styles.chartsGrid}>
          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={temperatureData1}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[27, 29]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={humidityData1}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[5, 30]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Soil Moisture</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={soilMoistureData1}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 2500]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#ffa600" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Water Level</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={waterLevelData1}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 4000]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#00bfff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        {/* =================================================================================================== */}
        <br />
        <h3 className={styles.tick}>Live Sensor Data 2</h3>
        <div className={styles.chartsGrid}>
          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={temperatureData2}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[28, 29]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Humidity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={humidityData2}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[27, 32]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Soil Moisture</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={soilMoistureData2}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 1600]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#ffa600" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Water Level</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={waterLevelData2}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 4000]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#00bfff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default Dashboard;
