const datepicker = new Vue({
    el: '.datepicker',
    data() {
        return {
            isLoading: false,
            view: '0', // 0: date 1:month 2:year
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            calendar: {
                year: 0,
                month: 0,
                date: 0,
                day: 0,
            },
            selectedDate: null,
        }
    },
    computed: {
        today() {
            return {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                date: new Date().getDate(),
                day: new Date().getDay(),
                hour: new Date().getHours()
            };
        },
        calendarFirstDate() {
            const monthDate = new Date(
                this.calendar.year,
                this.calendar.month - 1,
                1
            );
            const date = new Date(
                this.calendar.year,
                this.calendar.month - 1,
                1 - monthDate.getDay()
            );
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate(),
                day: date.getDay(),
            };
        },
        calendarMonthDate() {
            const data = [];
            let date;
            for (let i = 0; i < 42; i++) {
                date = new Date(
                    this.calendarFirstDate.year,
                    this.calendarFirstDate.month - 1,
                    this.calendarFirstDate.date + i
                );
                data.push({
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    date: date.getDate(),
                    day: date.getDay(),
                });
            }

            return data;
        },
        yearPickPool() {
            const data = [];
            const firstYear = Number(this.calendar.year.toString().slice(0, 3) + '0');

            for (let index = 0; index < 10; index++) {
                data.push(firstYear + index);
            }
            return data;
        }
    },
    methods: {
        setToday() {
            this.calendar.year = this.today.year;
            this.calendar.month = this.today.month;
            this.calendar.date = this.today.date;
            this.calendar.day = this.today.day;
            this.selectedDate = this.today;
        },
        changePicker() {
            const key = this.view;

            switch (key) {
                case '0':
                    this.view = '1';
                    break;
                case '1':
                    this.view = '2';
                    break;

                default: // do nothing
                    break;
            }
        },
        adjustYear(value) {
            this.calendar.year += value;
        },
        adjustMonth(value) {
            let month = this.calendar.month + value;
            if (month > 12) {
                this.adjustYear(1);
                this.calendar.month = 1;
            } else if (month < 1) {
                this.adjustYear(-1);
                this.calendar.month = 12;
            } else {
                this.calendar.month = month;
            }
        },
        checkToday(data, checkOtherMonth, month) {
            if (checkOtherMonth) {
                if (month > 12) {
                    month = 1;
                } else if (month < 1) {
                    month = 12;
                }
                return data.month !== month;
            } else {
                return (
                    data.year === this.today.year &&
                    data.month === this.today.month &&
                    data.date === this.today.date
                );
            }
        },
        checkSelectedDate(data) {
            return (
                data.year === this.selectedDate.year &&
                data.date === this.selectedDate.date &&
                data.month === this.selectedDate.month
            );
        },
        selectDate(data) {
            const newDate = {
                year: data.year,
                month: data.month,
                date: data.date,
                day: data.day,
            };

            return (this.selectedDate = newDate);
        },
        computeDiff(value) {
            if (value < 0) {
                value = Math.abs(value);
            } else if (value > 0) {
                value = Math.abs(value) * -1;
            }

            return value;
        },
        selectMonth(Month) {
            const vm = this;
            const diff = vm.calendar.month - Month;
            vm.adjustMonth(vm.computeDiff(diff));
            vm.view = '0';
        },
        selectYear(year) {
            const vm = this;
            const diff = vm.calendar.year - year;

            vm.adjustYear(vm.computeDiff(diff));
            vm.view = '1';
        }
    },
    created() {
        this.setToday();
    },
});
