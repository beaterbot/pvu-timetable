/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import './index.css';

const Timetable = ({
  groupCount, groupsPerRow, currentTime: currentTimeProp, startTime: startTimeProp, shiftDuration, timezone, format,
}) => {
  const { t } = useTranslation();

  const currentTime = currentTimeProp.setZone(timezone);
  const startTime = DateTime.fromFormat(startTimeProp, 'HH:mm', { zone: 'utc', setZone: true });

  const groups = _.chunk(new Array(groupCount).fill(0).map((_, index) => (`${t('group')} ${index + 1}`)), groupsPerRow);
  const fullSchedule = new Array(Math.ceil((24 * (60 / shiftDuration)) / groupCount)).fill(0).map((_, row) => (
    new Array(groupCount).fill(0).map((_, column) => {
      const schedule = startTime.plus({
        minutes: (row * groupCount + column) * shiftDuration,
      }).setZone(timezone).toFormat(format);
      const start = DateTime.fromFormat(schedule, format, { zone: timezone, setZone: true });
      const end = start.plus({ minutes: shiftDuration });
      const highlight = (() => {
        if (start.hour === 23 && end.hour === 0) {
          if (currentTime.hour === 23) {
            return currentTime.minute > start.minute;
          }
          if (currentTime.hour === 0) {
            return currentTime.minute < end.minute;
          }
        }
        return start < currentTime
          && currentTime < end;
      })();

      return {
        schedule,
        start,
        end,
        highlight,
      };
    })
  )).map((arr) => _.chunk(arr, groupsPerRow));

  return (
    <div className="time-table">
      <table>
        <tbody>
          {groups.map((row, index) => (
            <>
              <tr key={index}>
                {row.map((group, groupIndex) => (
                  <th
                    key={groupIndex}
                    style={{
                      0: { borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' },
                      [row.length - 1]: { borderTopRightRadius: '6px', borderBottomRightRadius: '6px' },
                    }[groupIndex]}
                  >{group}
                  </th>
                ))}
              </tr>
              {fullSchedule.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row[index].map((item, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className={item.highlight ? 'highlight' : ''}>
                      {item.schedule}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Timetable.propTypes = {
  groupCount: PropTypes.number.isRequired,
  groupsPerRow: PropTypes.number.isRequired,
  currentTime: PropTypes.object.isRequired,
  startTime: PropTypes.string.isRequired,
  shiftDuration: PropTypes.number.isRequired,
  timezone: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
};

export default Timetable;
