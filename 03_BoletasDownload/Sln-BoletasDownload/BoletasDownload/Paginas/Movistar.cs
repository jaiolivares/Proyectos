using BoletasDownload.Modelo;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
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

                //string tabOriginal = driver.CurrentWindowHandle;

                var inputRut = driver.FindElement(By.XPath("//input[contains(@formcontrolname,'rut')]"));
                inputRut.SendKeys(pagina.Rut);

                var inputClave = driver.FindElement(By.XPath("//input[contains(@formcontrolname,'password')]")); ;
                inputClave.SendKeys(pagina.Clave);

                var btnIngresar = driver.FindElement(By.ClassName("bg-movistargreen-500"));
                btnIngresar.Click();

                //wait.Until(ExpectedConditions.ElementExists(By.Id("CL_Web_Personas_TH_wtPage_Wrapper_block_wtMainContent_CL_Web_Personas_CW_Dashboard_wt14_block_CL_Web_Personas_PAT_wt336_block_wtContent_wt58")));
                //var btnVerDetalle = driver.FindElement(By.Id("CL_Web_Personas_TH_wtPage_Wrapper_block_wtMainContent_CL_Web_Personas_CW_Dashboard_wt14_block_CL_Web_Personas_PAT_wt336_block_wtContent_wt58"));
                //btnVerDetalle.Click();

                //wait.Until(ExpectedConditions.ElementExists(By.Id("CL_Web_Personas_TH_wt23_block_wtMainContent_CL_Web_Personas_CW_Billing_wt25_block_CustomSilkUI_wtDesktop2_block_wtContent_CL_Web_Personas_PAT_wt13_block_wtContent_CustomSilkUI_wt463_block_wtColumn2_wt287")));
                //var btnVerBoleta = driver.FindElement(By.Id("CL_Web_Personas_TH_wt23_block_wtMainContent_CL_Web_Personas_CW_Billing_wt25_block_CustomSilkUI_wtDesktop2_block_wtContent_CL_Web_Personas_PAT_wt13_block_wtContent_CustomSilkUI_wt463_block_wtColumn2_wt287"));
                //btnVerBoleta.Click();

                //wait.Until(wd => wd.WindowHandles.Count == 2);

                //foreach (string tab in driver.WindowHandles)
                //{
                //    if (tabOriginal != tab)
                //    {
                //        driver.SwitchTo().Window(tab);
                //        break;
                //    }
                //}

                //wait.Until(ExpectedConditions.ElementExists(By.Id("b1-b7-Content")));
                //var btnDownload = driver.FindElement(By.Id("b1-b7-Content"));
                //btnDownload.Click();

                Thread.Sleep(5000);
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