import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Path, Defs, LinearGradient, Stop, Circle} from 'react-native-svg';
import {AreaChart, Grid} from 'react-native-svg-charts';
import {differenceInDays, format} from 'date-fns';
import * as shape from 'd3-shape';

import colors from '../../constants/colors';
import {text} from '../../theme';
// @ts-ignore
import MetricsPath from 'art/metrics/path';

interface TrackerAreaChartProps {
  title?: string;
  label?: string;
  hint?: string;
  yesterday?: string;
  data: [Date, number][];
  intervalsCount?: number;
  gradientStart?: string;
  gradientEnd?: string;
  lineColor?: string;
}

export const TrackerAreaChart: FC<TrackerAreaChartProps> = ({
  title,
  data,
  hint,
  intervalsCount = 5,
  gradientStart = colors.white,
  gradientEnd = colors.white,
  lineColor = colors.white
}) => {
  const axisData: Date[] = data.map(([x, _]) => new Date(x));
  const chartData: number[] = data.map(([_, y]) => y);

  const totalDays = differenceInDays(
    axisData[axisData.length - 1],
    axisData[0]
  );
  const interval = Math.floor(totalDays / intervalsCount);

  const visibleAxisData = Array.from(new Array(6), (_, i) => i).map(
    (i) => axisData[Math.min(i * interval, axisData.length - 1)]
  );

  const ChartLine = ({line, path}: {line?: string; path?: any}) => {
    const d = new MetricsPath(path);
    return (
      <>
        <Path
          key="line"
          d={line}
          stroke={lineColor}
          strokeWidth={2}
          fill="none"
        />
        <Circle
          cx={8}
          cy={8}
          r={6}
          stroke={'white'}
          strokeWidth={24}
          fill={colors.teal}
          opacity={0.1}
          transform={`translate(${d.right - 11}, ${d.top + 45})`}
        />
        <Circle
          cx={2}
          cy={2}
          r={6}
          stroke={'white'}
          strokeWidth={4}
          fill={colors.teal}
          transform={`translate(${d.right - 5}, ${d.top + 50})`}
        />
      </>
    );
  };

  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor={gradientStart} />
        <Stop offset="80%" stopColor={gradientEnd} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  );

  const last = data[data.length - 1];
  const labelString = `${last[1]}`;

  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View
        style={styles.chartingRow}
        accessible
        accessibilityHint={hint}
        accessibilityLabel={labelString}>
        <View style={styles.chartingCol}>
          <AreaChart
            style={styles.chart}
            data={chartData}
            numberOfTicks={3}
            contentInset={{left: -5, right: 15, top: 30, bottom: -2}}
            curve={shape.curveNatural}
            svg={{
              strokeWidth: 1,
              stroke: colors.white,
              fill: 'url(#gradient)'
            }}>
            <Grid
              svg={{
                strokeWidth: 1,
                stroke: 'rgba(255, 255, 255, 0.4)',
                strokeDasharray: [5, 8],
                strokeDashoffset: 0
              }}
            />
            <ChartLine />
            <Gradient />
          </AreaChart>
          <View style={styles.xAxis}>
            {axisData.map((date, index) => {
              const visibleIndex = visibleAxisData.indexOf(date);
              if (visibleIndex === -1) {
                return null;
              }

              const prevDate =
                visibleIndex > 0 && visibleAxisData[visibleIndex - 1];

              const month = format(new Date(date), 'MMM');
              const prevMonth = prevDate && format(new Date(prevDate), 'MMM');

              if (month === prevMonth) {
                return;
              }

              const monthText =
                prevMonth !== month || index === axisData.length - 1
                  ? `\n${month}`
                  : '';

              return (
                <Text
                  key={`axis-${visibleIndex}`}
                  style={[
                    styles.date,
                    index === 0 && styles.leftAlign,
                    index === axisData.length - 1 && styles.rightAlign
                  ]}>
                  {`${monthText}`}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    ...text.medium,
    textAlign: 'center'
  },
  chartingRow: {
    flex: 1,
    height: 188,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  yAxis: {
    height: 144,
    width: 30,
    marginLeft: -30,
    right: -20
  },
  chartingCol: {
    flex: 1,
    flexDirection: 'column'
  },
  chart: {
    flex: 1,
    height: 160
  },
  xAxis: {
    height: 36,
    paddingRight: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  date: {
    ...text.small,
    lineHeight: 15,
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  leftAlign: {
    textAlign: 'left'
  },
  rightAlign: {
    textAlign: 'right'
  }
});
