<template>
  <div>
    <h1>Data Dashboard</h1>

    <!-- Display Table -->
    <div v-if="datadashboard.data.length > 0" class="dashboard">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in datadashboard.data" :key="item.id">
            <td @mouseover="hoverStudent(item.id)" @mouseout="hoveredId = null">
              {{ item.id }}
              <!-- Show the student name on hover using the computed property -->
              <span v-if="hoveredId === item.id" class="hovered-name">{{ hoveredStudentName }}</span>
            </td>
            <td>{{ item.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No data available</p>
    </div>

    <h1>Bar Chart</h1>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from 'axios';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: "AppDashboard",
  data() {
    return {
      datadashboard: { data: [] },
      chart: null,
      hoveredId: null,
      usersData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Number of Records',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [],
          },
        ],
      },
    };
  },
  computed: {
    hoveredStudentName() {
      console.log("finding student")
      console.log(this.hoveredId)

      this.usersData.forEach(student => {
        console.log(`Student: ${student.name}, ID: ${student.id}`);
        console.log(String(student.id) === String(this.hoveredId));
      });
      const student = this.usersData.find(student => String(student.id) === String(this.hoveredId));
      return student ? student.name : 'N/A';
    },
  },
  mounted() {
    this.loadData();
    this.loadUsersData();
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get('http://localhost:3000/api/results');
        this.datadashboard = response.data;

        const uniqueScores = Array.from(new Set(this.datadashboard.data.map(item => item.score)));
        this.chartData.labels = uniqueScores.sort((a, b) => a - b);
        this.chartData.datasets[0].data = this.chartData.labels.map(
          score => this.datadashboard.data.filter(item => item.score === score).length
        );

        if (this.chart) {
          this.chart.data.labels = this.chartData.labels;
          this.chart.data.datasets[0].data = this.chartData.datasets[0].data;
          this.chart.update();
        } else {
          this.createChart();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async loadUsersData() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.usersData = response.data.students;
      } catch (error) {
        console.error('Error loading users data:', error);
      }
    },
    hoverStudent(id) {
      this.hoveredId = id;
    },
    createChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Score',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Records',
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
});
</script>

<style>

.hovered-name {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
}

body {
  background-color: #b8e3ff;
}

.data-table {
  width: 50%;
  margin: 1% auto;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #f2f2f2;
}

.data-table th, .data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
}
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.dashboard-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  max-width: 200px;
  text-align: center;
}

#myChart {
  max-width: 80%;
  max-height: 50%;
  margin: 1% auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f2f2f2;
}
</style>
