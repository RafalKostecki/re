const Calendar = function() {
    const MONTH_ENG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const DAYS_ENG = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Sun'];
    const MONTH_POL = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    const DAYS_POL = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
    let priv = new WeakMap();
    let _ = function(instance) {return priv.get(instance)};
    let now = new Date();
    class CalendarClass {
        constructor(setLanguage) {
            let privOptions = {
                clicked: false,
                language: setLanguage,
                firstDate: {
                    day: now.getDate(),
                    month: now.getMonth(),
                    year: now.getFullYear(),
                }
            };
            priv.set(this, privOptions);
        }
        run() {
            let btnPrev = document.querySelector('.calendar-btn-prev');
            let btnNext = document.querySelector('.calendar-btn-next');
            let clnBtn = document.getElementById('reservation')
            btnPrev.addEventListener('click', () => this.moveCalendar(0));
            btnNext.addEventListener('click', () => this.moveCalendar(1));
            clnBtn.addEventListener('click', () => this.showHide());

            this.setDataButton(now.getDate());
            this.setHeader();
        }
        setDataButton(newDay) {
            if (newDay < 1) return;
            if (now.getFullYear() >= _(this).firstDate.year) {
                if ((now.getMonth() == _(this).firstDate.month && newDay < _(this).firstDate.day) ||(now.getMonth() < _(this).firstDate.month && now.getFullYear() <= _(this).firstDate.year)) return;
                let nowBox = document.getElementById('date-box');
                nowBox.innerHTML = newDay + '/' + (now.getMonth()+1) + '/' + now.getFullYear();
            }
        }
        setHeader() {
            document.getElementById('month').innerHTML = this.month;
            document.getElementById('year').innerHTML = now.getFullYear();
        }
        fillDaysOfWeek() {
            let space = document.getElementById('spaceForWeek');
            let days;
            _(this).language == 'polish' ? days = DAYS_POL : days = DAYS_ENG;
            for (var i=0; i<7; i++) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(days[i]));
                space.appendChild(li);
            }
        }
        fillDaysOfMonth() {
            let space = document.getElementById('spaceForDays');
            let innerValue = '';
            let firstDayDate = new Date(now.getFullYear(), now.getMonth(), 0);
            let firstDay = firstDayDate.getDay();
            let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            for (let i=0; i<lastDay.getDate()+firstDay; i++) {
                let li = document.createElement("li");
                li.addEventListener('click', ()=> this.setDataButton(i-firstDay+1))
                let innerValue = ' ';
                li.appendChild(document.createTextNode(
                    i >= firstDay ? i-firstDay+1 : ' '
                ));
                if(i-firstDay+1 == now.getDate() && _(this).firstDate.month == now.getMonth() && _(this).firstDate.year == now.getFullYear()) li.className = 'calendar-days-isactive';
                space.appendChild(li);
            }
        }
        moveCalendar(type) {
            type === 1 ? now.setMonth(now.getMonth()+1) : now.setMonth(now.getMonth()-1);
            let space = document.getElementById('spaceForDays');
            space.innerHTML = '';
            this.setHeader();
            this.fillDaysOfMonth();
        }
        showHide() {
            let calendarBox = document.getElementById('calendar');
            calendarBox.style.display = 'block';

            _(this).clicked ? calendarBox.style.display = 'none' : calendarBox.style.display = 'block';
            _(this).clicked = !(_(this).clicked);
        }
        get month() {
            let month;
            _(this).language === 'polish' ? month = MONTH_POL : month = MONTH_ENG;
            return month[now.getMonth()];
        }
    };
    return CalendarClass;
}();

const calendar = new Calendar('english');
calendar.run();
calendar.fillDaysOfWeek();
calendar.fillDaysOfMonth();
