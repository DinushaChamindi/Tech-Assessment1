<?php

defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	exit;
}

//required for REST API
require(APPPATH . '/libraries/REST_Controller.php');
require APPPATH . 'libraries/Format.php';
use Restserver\Libraries\REST_Controller;

class WebsiteRestController extends REST_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('website_model', 'wm');
    }
	
	function websites_get() {
        $websites = $this->wm->get_website_list();

        if ($websites) {
            $this->response($websites, 200);
        } else {
            $this->response(array(), 200);
        }
    }
    function IssueDetails_get() {
        $details = $this->wm->get_IssueDetail_list();

        if ($details) {
            $this->response($details, 200);
        } else {
            $this->response(array(), 200);
        }
    }
    function Books_get (){
        $websites = $this->wm->get_Book_list();
        
                if ($websites) {
                    $this->response($websites, 200);
                } else {
                    $this->response(array(), 200);
                }
    }
    function Members_get (){
        $websites = $this->wm->get_Member_list();
        
                if ($websites) {
                    $this->response($websites, 200);
                } else {
                    $this->response(array(), 200);
                }
    }

    function website_get() {
        if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }

        $website = $this->wm->get_website($this->get('id'));

        if ($website) {
            $this->response($website, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
    
    function Book_get() {
        if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }

        $book = $this->wm->get_Book($this->get('id'));

        if ($book) {
            $this->response($book, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }

    function Member_get() {
        if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }

        $member = $this->wm->get_Member($this->get('id'));

        if ($member) {
            $this->response($member, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
	
	function add_website_post() {
        $website_title = $this->post('title');
        $website_url = $this->post('url');
        
        $result = $this->wm->add_website($website_title, $website_url);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function add_Book_post() {
        $bookName = $this->post('bookName');
        $auther = $this->post('auther');
        $category = $this->post('category');
        $price = $this->post('price');
        
        $result = $this->wm->add_Book( $bookName, $auther, $category, $price);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
    //memberName: '', address: '', contactNo:'', type: '', email: '' 
    function add_Member_post() {
        $memberName = $this->post('memberName');
        $address = $this->post('address');
        $contactNo = $this->post('contactNo');
        $type = $this->post('type');
        $email = $this->post('email');
        
        $result = $this->wm->add_Member(  $memberName, $address, $contactNo, $type, $email);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function Issue_book_post(){
        // `date`, `bookId`, `memberId`, `returnDate`, `isReturn
        $date = $this->post('date');
        $bookId = $this->post('bookId');
        $memberId = $this->post('memberId');
        $returnDate = $this->post('returnDate');
       
        
        $result = $this->wm->issue_book(  $date, $bookId, $memberId, $returnDate);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function update_website_put() {
        $website_id = $this->put('id');
        $website_title = $this->put('title');
        $website_url = $this->put('url');

        $result = $this->wm->update_website($website_id, $website_title, $website_url);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
    
    function update_Book_put(){
        $id = $this->put('id');
        $bookName = $this->put('bookName');
        $auther = $this->put('auther');
        $category = $this->put('category');
        $price = $this->put('price');

        $result = $this->wm->update_Book($id, $bookName, $auther, $category, $price);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => $id));
        }
    }

    function update_Member_put(){
        $id = $this->put('Id');
        $memberName = $this->put('memberName');
        $address = $this->put('address');
        $contactNo = $this->put('contactNo');
        $type = $this->put('type');
        $email = $this->put('email');
       
        $result = $this->wm->update_Member($id, $memberName, $address, $contactNo, $type, $email);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => $id));
        }
    }
	function delete_website_delete($website_id) { //path parameter, example, /delete/1

        $result = $this->wm->delete_website($website_id);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
    function delete_Book_delete($id) { //path parameter, example, /delete/1
        
                $result = $this->wm->delete_Book($id);
        
                if ($result === FALSE) {
                    $this->response(array('status' => 'failed'));
                } else {
                    $this->response(array('status' => 'success'));
                }
     }
     function delete_Member_delete($id) { //path parameter, example, /delete/1
                
        $result = $this->wm->delete_Member($id);
        if ($result === FALSE) {
              $this->response(array('status' => 'failed'));
                } else {
                $this->response(array('status' => 'success'));
            }
      }
}