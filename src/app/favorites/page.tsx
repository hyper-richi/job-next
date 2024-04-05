import VacancyCard from '@/components/VacancyCard/VacancyCard';
import styles from './page.module.scss';
import { VacancyTransform } from '../../..';

const vacancy: VacancyTransform = {
  id: 'b0eef811-d474-11ee-a9de-3950de1bc4b3',
  source: 'Вакансия интернет ресурса',
  region: { region_code: '6600000000000', name: 'Свердловская область' },
  company: {
    companycode: '5147746474134',
    'hr-agency': false,
    inn: '7709969870',
    kpp: '770901001',
    name: '',
    ogrn: '5147746474134',
    site: 'https://www.rabota.ru/',
    url: 'https://trudvsem.ru/company/5147746474134',
  },
  'creation-date': '2024-02-26',
  salary: 'от 50000',
  salary_min: 50000,
  salary_max: 0,
  'job-name': 'Администратор сайта',
  vac_url: 'https://trudvsem.ru/vacancy/card/5147746474134/b0eef811-d474-11ee-a9de-3950de1bc4b3',
  employment: 'Полная занятость',
  schedule: 'Полный рабочий день',
  duty:
    'Вакансия компании: ТК Люмна<br /><br /><br />\r\n' +
    '<strong>Обязанности:</strong><br />\r\n' +
    '<ul>\r\n' +
    '<li>Администрирование и техническая поддержка сайта</li>\r\n' +
    '<li>Доработка и изменение структуры сайта</li>\r\n' +
    '<li>Актуализация информации на сайте, наполнение готовым контентом, создание новых разделов, страниц;</li>\r\n' +
    '<li>Обеспечение стабильной работы сайта со всеми интегрированными системами (Самостоятельное внесение изменений в HTML, CSS, установка модулей, настройка обмена между сайтом и 1С, Дела и Финансы);</li>\r\n' +
    '<li>Администрирование внутренних баз сайта, создание внутренних связок;</li>\r\n' +
    '<li>Совершенствование внешнего вида сайта, оптимизация интерфейса, юзабилити</li>\r\n' +
    '<li>Проверка сигналов о сбоях в системе и устранение неполадок;</li>\r\n' +
    '<li>Контроль корректности отображения страниц, верстки, выявление функциональных сбоев, ошибок в контенте;</li>\r\n' +
    '<li>Решение SEO задач, продвижение сайта в поисковых системах, составление семантического ядра, регистрация в различных справочниках и сервисах</li>\r\n' +
    '<li>Подготовка отчетов, аудит сайта;</li>\r\n' +
    '<li>Обратная связь в случае выявления проблем и несоответствий программистам или непосредственному руководителю;</li>\r\n' +
    '<li>Выполнение поручений руководителя.</li>\r\n' +
    '</ul>\r\n' +
    '<strong>Требования:</strong><br />\r\n' +
    '<ul>\r\n' +
    '<li>Опыт работы администратором сайта от 2-х лет;</li>\r\n' +
    '<li>Опыт работы CMS 1С-Bitrix.</li>\r\n' +
    '<li>Знание HTML, CSS, MySQL, Firebird, Oracle, SQL Server</li>\r\n' +
    '<li>Знание Photoshop, Illustrator, CorelDraw</li>\r\n' +
    '<li>Умение понятно и четко коммуницировать с менеджером проекта</li>\r\n' +
    '<li>Приветствуется знание React, Vue, Angular, PHP.</li>\r\n' +
    '</ul>\r\n' +
    '<strong>Условия:</strong><br />\r\n' +
    '<ul>\r\n' +
    '<li>Официальное трудоустройство по ТК РФ</li>\r\n' +
    '<li>Стабильная заработная плата без задержек 2 раза в месяц</li>\r\n' +
    '<li>Комбинированный режим работы</li>\r\n' +
    '<li>Пятидневная рабочая неделя (ПН-ПТ) с 9-00 до 18-00</li>\r\n' +
    '<li>Место работы:</li>\r\n' +
    '<li>г. Березовский, ул. Уральская,132</li>\r\n' +
    '</ul>',
  category: {
    specialisation: 'Информационные технологии, телекоммуникации, связь',
  },
  requirement: { education: 'Среднее', experience: 5 },
  addresses: {
    address: [
      {
        location: 'string',
        lng: 'string',
        lat: 'string',
      },
    ],
  },
  social_protected: '',
  contact_list: [],
  contact_person: 'Ирина',
  work_places: 1,
  currency: '«руб.»',
};

export default function Favorites() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Избранные вакансии</h2>
        </div>
      </div>
      <div className={styles.container}>
        <VacancyCard
          // idx={idx}
          key={1}
          jobCategory={'InformationTechnology'}
          searchText={'react'}
          offset={'0'}
          regionCode={'all'}
          vacancy={vacancy}
        />
      </div>
    </>
  );
}
