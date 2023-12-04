// Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

// Клас Writer відповідає за роботу з текстом.
class Writer {
  // Властивість #content представляє поточний текст. Вона ініціалізується порожнім рядком.
  #content = "";
  // Сетер для властивості content. Він приймає значення newContent (новий текст),
  set content(newContent) {
    // який потрібно встановити як поточний текст. Кожен раз, коли присвоюється нове значення,
    this.#content = newContent;
    // викликається метод #store(), який зберігає поточний стан тексту у версіях.
    this.#store();
  }
  // Метод гетер для властивості content, повертає this.#content.
  get content() {
    return this.#content;
  }
  // Приватний метод #store використовується для зберігання поточного стану тексту.
  #store() {
    // Він викликає статичний метод класу Version, create, передаючи йому поточний текст як аргумент.
    Version.create(this.#content);
  }
  // Метод restore відновлює попередній стан тексту, викликаючи статичний метод класу Version, restore.
  restore() {
    const test = Version.restore();
    // console.log(test); // тестую роботу метода статік ресторе
    // Цей метод повертає останню збережену версію тексту, яку ми встановлюємо як поточний текст.
    if (test) this.#content = test.content; // тут умова по любе потрібна
  }
}

// Клас Version відповідає за створення та зберігання версій тексту.
class Version {
  // В конструкторі класу Version приймається аргумент content та встановлює його.
  constructor(content) {
    // Це вхідний аргумент, який представляє теку збережену версію тексту.
    this.content = content;
  }

  // Властивість #versions це приватний статичний масив, пустий за замовчуванням, що зберігає всі створені версії.
  static #versions = [];
  // Статичний метод create приймає аргумент content (текст версії) і створює новий екземпляр класу Version в який передає content .
  static create(content) {
    // Створений екземпляр додається до масиву версій versions.
    this.#versions.push(new Version(content));
  }
  // Статичний метод restore видаляє останный элемент масиву,
  static restore() {
    if (this.#versions.length > 1) {
      const test = this.#versions.pop(); //видаляє останній элемент масиву
      // console.log(test); // перевіряю що витягнув
      // та повертає останню збережену версію тексту з масиву версій this.#versions[this.#versions.length - 1] .
      return this.#versions[this.#versions.length - 1];
    } else return false;

    // а якщо без умов - то теж працює, але якость через...
    // this.#versions.pop();
    // console.log(
    //   this.#versions.length - 1,
    //   this.#versions[this.#versions.length - 1]
    // );
    // return this.#versions[this.#versions.length - 1];
  }
}
console.log("Завдання 5 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо новий екземпляр класу Writer
const writer = new Writer();

// Присвоюємо текст за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);
