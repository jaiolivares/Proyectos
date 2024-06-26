﻿using BoletasDownload.Modelo;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.Extensions;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace BoletasDownload.Paginas
{
    public class Movistar
    {
        public static void EjecutarMovistar(Pagina pagina)
        {
            IWebDriver driver = new ChromeDriver();
            WebDriverWait wait = new(driver, TimeSpan.FromSeconds(20));
            try
            {
                driver.Manage().Window.Maximize();
                driver.Navigate().GoToUrl(pagina.Url);

                Thread.Sleep(1000);

                string tabOriginal = driver.CurrentWindowHandle;

                wait.Until(ExpectedConditions.ElementExists(By.ClassName("mimovistar")));
                var btnMiMovistar = driver.FindElement(By.ClassName("mimovistar"));
                btnMiMovistar.Click();

                wait.Until(ExpectedConditions.ElementExists(By.ClassName("mvx-app_login")));
                var btnIngresarMovistar = driver.FindElement(By.ClassName("mvx-app_login"));
                btnIngresarMovistar.Click();

                var inputRut = driver.FindElement(By.XPath("//input[contains(@formcontrolname,'rut')]"));
                inputRut.SendKeys(pagina.Rut);

                var inputClave = driver.FindElement(By.XPath("//input[contains(@formcontrolname,'password')]")); ;
                inputClave.SendKeys(pagina.Clave);

                var btnIngresar = driver.FindElement(By.ClassName("bg-movistargreen-500"));
                btnIngresar.Click();

                wait.Until(ExpectedConditions.ElementExists(By.Id("boletas-y-pagos")));
                var btnBoletaFacturas = driver.FindElement(By.Id("boletas-y-pagos"));
                btnBoletaFacturas.Click();

                wait.Until(ExpectedConditions.ElementExists(By.Id("boton-descargar-boleta-secundario")));
                var btnDescargarBoleta = driver.FindElement(By.Id("boton-descargar-boleta-secundario"));
                btnDescargarBoleta.Click();

                wait.Until(wd => wd.WindowHandles.Count == 2);

                foreach (string tab in driver.WindowHandles)
                {
                    if (tabOriginal != tab)
                    {
                        driver.SwitchTo().Window(tab);
                        break;
                    }
                }

                Thread.Sleep(2000);

                //driver.ExecuteJavaScript("alert('ccc');");

                wait.Until(ExpectedConditions.ElementExists(By.Id("formId:j_idt19")));
                var btnDownload = driver.FindElement(By.Id("formId:j_idt19"));
                btnDownload.Click();

                Thread.Sleep(4000);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error Catch MOVISTAR: " + ex);
            }
            finally
            {
                driver.Quit();
            }
        }
    }
}