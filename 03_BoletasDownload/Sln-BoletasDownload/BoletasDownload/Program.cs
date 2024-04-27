//Console.WriteLine("Hello, World!");

using BoletasDownload.Paginas;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

IWebDriver driver = new ChromeDriver();

Entel entel = new();

entel.EjecutarEntel();